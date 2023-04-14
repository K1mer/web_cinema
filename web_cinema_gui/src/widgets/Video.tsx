import { ReactEventHandler, useEffect, useState } from 'react';
import { CinemaService } from '../services';


export const Video: React.FC = () => {
    const [ src, setSrc ] = useState<string>( '' );
    CinemaService.setVideoSourceSetter( setSrc );

    useEffect( () => { CinemaService.startTransmition() }, [] );

    const videoPauseHandler: ReactEventHandler<HTMLVideoElement> = () => {
        CinemaService.PauseVideo();
    }

    const videoPlayHandler: ReactEventHandler<HTMLVideoElement> = () => {
        CinemaService.PlayVideo();
    }

    const videoTimeUpdateHandler: ReactEventHandler<HTMLVideoElement> = ( event ) => {
        CinemaService.SetTimecode( event.currentTarget.currentTime );
    }

    return <div className = 'video-container'>
        <video
            id = 'VideoPlayer'
            src = { src }
            onPause = { videoPauseHandler }
            onPlay = { videoPlayHandler }
            onTimeUpdate = { videoTimeUpdateHandler }
        />
    </div>;
}