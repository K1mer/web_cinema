/** Модуль экспортирует компонент с видео-проигрывателем. */

import { ReactEventHandler, useEffect, useRef, useState } from 'react';

import { CinemaService } from '../services';


export const Video: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>();

    const [ paused, setPause ] = useState<boolean>();

    const unpauseVideo = () => {
        setPause( false );
        videoRef.current?.play();
    }

    const pauseVideo = () => {
        setPause( true );
        videoRef.current?.pause();
    }

    const setVideoTimecode = ( timecode: number ) => {
        if( videoRef.current && videoRef.current.currentTime !== timecode ) {
            videoRef.current.currentTime = timecode;
        }
    }

    CinemaService.setVideoStateHandlers( unpauseVideo, pauseVideo, setVideoTimecode );

    useEffect( () => {
        setPause( true );
        CinemaService.startTransmition() 
    }, [] );

    const videoPauseHandler: ReactEventHandler<HTMLVideoElement> = () => {
        if( !paused ) {
            videoRef.current?.play();
            CinemaService.PauseVideo();
        }
    }

    const videoPlayHandler: ReactEventHandler<HTMLVideoElement> = () => {
        if( paused ) {
            videoRef.current?.pause();
            CinemaService.PlayVideo();
        }
    }

    const videoTimeUpdateHandler: ReactEventHandler<HTMLVideoElement> = ( e ) => {
        CinemaService.SetTimecode( e.currentTarget.currentTime );
    }

    const videoContainerCls = 'video-container ' + ( paused ? 'on-pause' : 'on-play' );

    return <div className = { videoContainerCls } onLoad = { () => videoRef.current?.load() }>
        <video
            controls
            ref = { videoRef as any }
            id = 'VideoPlayer'
            src = { CinemaService.getVideoSourceUrl() }
            onPause = { videoPauseHandler }
            onPlay = { videoPlayHandler }
            onSeeked = { videoTimeUpdateHandler }
        />
    </div>;
}
