
type VideoSourceChangeAction = React.Dispatch<React.SetStateAction<string>>;
type UserAmountChangeAction = React.Dispatch<React.SetStateAction<number>>;

/** Коды ответов, которые могут прийти в WS-соединении. */
enum ResponseCode {
    NewVideoAppeard,
    Play,
    Pause,
    ChangeTimeCode,
    UserJoined,
    UserLeft
}

export class CinemaService {
    static setVideoSourceSetter( setVideoSrc: VideoSourceChangeAction ): void {
        this._sourceChangeReaction = setVideoSrc;
    }

    static setUserAmountSetter( setUserAmount: UserAmountChangeAction ): void {
        this._userAmountChangeReaction = setUserAmount;
    }

    static async startTransmition(): Promise<void> {
        this.socket = new WebSocket( 'ws://' + window.location.hostname + ':8080' )

        this.socket.onopen = function() {
            console.log( 'Websocket connection is on!' );

            this.send( "Меня зовут Джон" );
        };
          
        this.socket.onmessage = event => {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        };
          
        this.socket.onclose = event => {
        if( event.wasClean ) {
            console.log(`[close] Соединение закрыто чисто, код=${ event.code } причина=${ event.reason }`);
        } else {
            // например, сервер убил процесс или сеть недоступна
            // обычно в этом случае event.code 1006
            console.log('[close] Соединение прервано');
        }
        };
        
        this.socket.onerror = () => console.log( 'Websocket error appeard!' );
    }
// https://stackoverflow.com/questions/30864573/what-is-a-blob-url-and-why-it-is-used
// https://learn.javascript.ru/websocket#prostoy-primer
// https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Live_streaming_web_audio_and_video

    static async SetTimecode( timecode: number ): Promise<void> {
    }

    static async PauseVideo(): Promise<void> {
    }

    static async PlayVideo(): Promise<void> {
    }

    static async SendVideoFile(): Promise<void> {
    }

    private static async OnUserJoin(): Promise<void> {
    }

    private static async OnUserLeft(): Promise<void> {
    }

    private static _sourceChangeReaction: VideoSourceChangeAction;

    private static _userAmountChangeReaction: UserAmountChangeAction;

    private static socket: WebSocket;
}
