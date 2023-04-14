/** Модуль экспортирует компонент с видео-проигрывателем. */

type VideoSourceChangeAction = React.Dispatch<React.SetStateAction<string>>;
type UserAmountChangeAction = React.Dispatch<React.SetStateAction<number>>;
type VideoListChangeAction = React.Dispatch<React.SetStateAction<string[]>>;

/** Коды ответов, которые могут прийти в WS-соединении. */
enum WebSocketResponseCode {
    NewVideoAppeard,
    Play,
    Pause,
    ChangeTimeCode,
    UserJoined,
    UserLeft
}

/** URL сервера. */
const server = `http://${ window.location.hostname }:80/`;

/** Сервис работы приложения. */
export class CinemaService {
    /** Сеттер React-хука для установки источника видео. */
    static setVideoSourceSetter( setVideoSrc: VideoSourceChangeAction ): void {
        this._sourceChangeReaction = setVideoSrc;
    }

    /** Сеттер React-хука для изменения списка видео для просмотра. */
    static setVideoListSetter( setVideoList: VideoListChangeAction ): void {
        this._videListChangeReaction = setVideoList;
    }

    /** Сеттер React-хука для изменения количества пользователей. */
    static setUserAmountSetter( setUserAmount: UserAmountChangeAction ): void {
        this._userAmountChangeReaction = setUserAmount;
    }

    /** Метод инициирует подключение по Websocket к серверу. */
    static async startTransmition(): Promise<void> {
        this.socket = new WebSocket( `ws://${ window.location.hostname }:80/websocket` );

        this.socket.onopen = function() {
            console.log( 'Websocket connection is on!' );
        };
          
        this.socket.onmessage = event => {
            // Todo В зависимости от полученного кода (ResponseCode), выполнить соотвествующую обработку
        };
          
        this.socket.onclose = event => {
            if( event.wasClean ) {
                console.log( `[close] Соединение закрыто чисто, код=${ event.code }, причина=${ event.reason }.` );
            } else {
                console.log( '[close] Соединение прервано.' );
            }
        };

        this.socket.onerror = () => console.log( 'Websocket error appeard!' );
    }

    /** Метод отправляет запрос по websocket'у на установку выбранного момента времени видео. */
    static SetTimecode( timecode: number ): void {
        this.socket?.send( 'timecode' + timecode );
    }

    /** Метод отправляет запрос по websocket'у на установку видео на паузу. */
    static PauseVideo(): void {
        this.socket?.send( 'pause' );
    }

    /** Метод отправляет запрос по websocket'у на продолжение видео. */
    static PlayVideo(): void {
        this.socket?.send( 'play' );
    }

    static async SendVideoFile( videoFile: File ): Promise<void> {
    }

    /** Обработчик события появления нового видео в списке. */
    private static async OnNewVideo(): Promise<void> {
    }
 
    /** Обработчик события продолжения просмотра видео. */
    private static async OnPlay(): Promise<void> {
    }

    /** Обработчик события установления на паузу. */
    private static async OnPause(): Promise<void> {
    }

    /** Обработчик события изменения текущего момента просмотра видео. */
    private static async OnChangeTimecode(): Promise<void> {
    }

    /** Обработчик события входа нового пользователя в комнату. */
    private static async OnUserJoin(): Promise<void> {
    }

    /** Обработчик события выхода пользователя из комнаты. */
    private static async OnUserLeft(): Promise<void> {
    }

    private static _videListChangeReaction: VideoListChangeAction;
    private static _sourceChangeReaction: VideoSourceChangeAction;
    private static _userAmountChangeReaction: UserAmountChangeAction;
    private static socket: WebSocket;
}

/** 
 * Простая shortcut функция посылки запроса и обработки приходящий данных.
 * @param url - URL запроса.
 * @param [method = 'GET'] - метод запроса.
 * @param [body] - тело запроса (если необходимо).
 * */
const sendRequest = async ( url: string, method: string = 'GET', body?: BodyInit ) => {
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
