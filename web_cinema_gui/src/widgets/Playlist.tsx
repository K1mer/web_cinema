/** Модуль экспортирует компонент со списком видеофайлов, доступных к выбору для просмотра. */

import { createRef, useRef, useState } from 'react';

import { CinemaService } from '../services';


export const Playlist: React.FC = () => {
    const [ videoList, setVideoList ] = useState<string[]>([]);
    CinemaService.setVideoListSetter( setVideoList );

    const inputRef = createRef<HTMLInputElement>();
    const keyRef = useRef<number>( Date.now() );

    const handleUploadButtonClick = () => {
        inputRef.current?.click();
    };

    const handleImportFileChange = async () => {
        const file = inputRef.current?.files?.[ 0 ];
        if( file ) {
            await CinemaService.SendVideoFile( file );
        }
    }

    return <div className = 'VerticalFlex right-container'>
        <div className = 'right-container__title'>Доступные для просмотра видео</div>
        <div className = 'VerticalFlex' style = {{ height: '100%' }}>
        {
            videoList.map( videoName =>
                <div key = { videoName }>
                    { videoName }
                </div>
            )
        }
        </div>
        <input
            hidden
            type = 'file'
            ref = { inputRef }
            key = { keyRef.current }
            onChange = { handleImportFileChange }
        />
        <button
            className = 'right-container__button'
            onClick = { handleUploadButtonClick }
        >
            Загрузить
        </button>
    </div>;
}
