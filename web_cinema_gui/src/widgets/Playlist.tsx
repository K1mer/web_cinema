/** Модуль экспортирует компонент со списком видеофайлов, доступных к выбору для просмотра. */

import { useState } from 'react';

import { CinemaService } from '../services';


export const Playlist: React.FC = () => {
    const [ videoList, setVideoList ] = useState<string[]>([]);
    CinemaService.setVideoListSetter( setVideoList );

    return <div className = 'VerticalFlex right-container'>
        <div className = 'right-container__title'>
            Плейлист
        </div>
        <div className = 'VerticalFlex' style = {{ height: '100%' }}>
        {
            videoList.map( videoName =>
                <div key = { videoName }>
                    { videoName }
                </div>
            )
        }
        </div>
    </div>;
}
