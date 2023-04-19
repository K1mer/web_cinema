/** Модуль экспортирует компонент с видео-проигрывателем. */

/** Тип метода, устанавливаемого состояние React-компонента. */
type ReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>

/** Коды ответов, которые могут прийти в WS-соединении. */
enum WebSocketResponseCode {
    Play,
    Pause,
    ChangeTimeCode,
    UserListChanged
}

/** Сервис работы приложения. */
export class CinemaService {
    /** Методы устанавливает обработчиков событий изменения состояний комнаты. */
    static setVideoStateHandlers( onUnpause: Function, onPause: Function, onTimecodeChange: Function ) {
        this.unpauseEventHandler = onUnpause;
        this.pauseEventHandler = onPause;
        this.timecodeChangeEventHandler = onTimecodeChange;
    }

    /** Метод возвращает URL источника видео-потока.. */
    static getVideoSourceUrl(): string {
        return `http://${ window.location.hostname }:${ this.videoServicePort }/videoplayer`;
    }

    /** Сеттер React-хука для изменения списка видео для просмотра. */
    static setVideoListSetter( setVideoList: ReactStateSetter<string[]> ): void {
        this.videoListChangeReaction = setVideoList;
    }

    /** Сеттер React-хука для изменения количества пользователей. */
    static setUserAmountSetter( setUserAmount: ReactStateSetter<number> ): void {
        this.userAmountChangeReaction = setUserAmount;
    }

    /** Метод инициирует подключение по Websocket к серверу. */
    static startTransmition(): void {
        if( this.socket ) {
            return;
        }

        this.socket = new WebSocket( `ws://${ window.location.hostname }:${ this.wsServicePort }/` );

        this.socket.onopen = () => {
            console.log( 'Websocket-соединение установлено!' );
        };
          
        this.socket.onmessage = event => {
            const data = JSON.parse( event.data );

            switch( data.responseCode as WebSocketResponseCode ) {
                case WebSocketResponseCode.Play:
                    this.OnPlay();
                    break;
                case WebSocketResponseCode.Pause:
                    this.OnPause();
                    break;
                case WebSocketResponseCode.ChangeTimeCode:
                    this.OnChangeTimecode( data.timeCode );
                    break;
                case WebSocketResponseCode.UserListChanged:
                    this.OnUserListChanged( data.userAmount );
                    break;
            }
        };
          
        this.socket.onclose = () => console.log( 'Websocket-соединение прервано.' );
        this.socket.onerror = () => console.log( 'Websocket-соединение прервано из-за ошибки.' );
    }

    /** Метод отправляет запрос по websocket'у на установку выбранного момента времени видео. */
    static SetTimecode( timecode: number ): void {
        this.sendRequest( this.server + 'timecode', 'POST', JSON.stringify({ timecode }) );
    }

    /** Метод отправляет запрос по websocket'у на установку видео на паузу. */
    static PauseVideo(): void {
        this.sendRequest( this.server + 'pause', 'POST' );
    }

    /** Метод отправляет запрос по websocket'у на продолжение видео. */
    static PlayVideo(): void {
        this.sendRequest( this.server + 'play', 'POST' );
    }
 
    /** Обработчик события продолжения просмотра видео. */
    private static OnPlay(): void {
        this.unpauseEventHandler?.();
    }

    /** Обработчик события установления на паузу. */
    private static OnPause(): void {
        this.pauseEventHandler?.();
    }

    /** Обработчик события изменения текущего момента просмотра видео. */
    private static OnChangeTimecode( timeCode: number ): void {
        this.timecodeChangeEventHandler?.( timeCode );
    }

    /** Обработчик события изменения количества пользователей в комнате. */
    private static OnUserListChanged( userAmount: number ): void {
        this.userAmountChangeReaction( userAmount );
    }

    /** 
     * Метод создания и посылки запроса с дальнейшей обработкой ответа.
     * @param url - URL запроса.
     * @param [method = 'GET'] - метод запроса.
     * @param [body] - тело запроса (если необходимо).
     * */
    private static async sendRequest( url: string,
                                      method: string = 'GET',
                                      body?: BodyInit ): Promise<Record<string, any>> {
        const response = await fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });

        const data = await response.json();

        if( !data?.success ) {
            throw new Error( 'No data or operation is not success.' );
        };

        return data;
    }

    /** Порт сервиса обработки HTTP-запросов. */
    private static readonly httpServicePort = 3001;

    /** Порт сервиса обработки Websocket соединения. */
    private static readonly wsServicePort = 3002;

    /** Порт сервиса предоставления видео-потока. */
    private static readonly videoServicePort = 3003;

    /** URL сервера. */
    private static readonly server = `http://${ window.location.hostname }:${ this.httpServicePort }/`;

    private static unpauseEventHandler: Function;
    private static pauseEventHandler: Function;
    private static timecodeChangeEventHandler: Function;

    private static videoListChangeReaction: ReactStateSetter<string[]>;
    private static userAmountChangeReaction: ReactStateSetter<number>;
    private static socket: WebSocket;
}
