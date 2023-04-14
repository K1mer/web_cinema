import { ReactEventHandler, useEffect, useState } from 'react';
import { CinemaService } from '../services';


export const Video: React.FC = () => {
    const [ src, setSrc ] = useState<string>( '' );
    CinemaService.setVideoSourceSetter( setSrc );

    useEffect( () => { CinemaService.startTransmition() }, [] );

    const videoPauseHandler: ReactEventHandler<HTMLVideoElement> = ( event ) => {
    }

    const videoPlayHandler: ReactEventHandler<HTMLVideoElement> = ( event ) => {
    }

    const videoTimeUpdateHandler: ReactEventHandler<HTMLVideoElement> = ( event ) => {
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