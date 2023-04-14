import { createRef, useRef } from "react";

export const Playlist: React.FC = () => {
    const inputRef = createRef<HTMLInputElement>();
    const keyRef = useRef<number>( Date.now() );

    const handleUploadButtonClick = () => {
        inputRef.current?.click();
    };

    const handleImportFileChange = async () => {
        await console.log( inputRef.current?.files?.[ 0 ] );
    }

    return <div className = 'VerticalFlex right-container'>
        <div className = 'right-container__title'>Доступные для просмотра видео</div>
        <div className = 'VerticalFlex' style = {{ height: '100%' }}>

        </div>
        <div className = 'HorizontalFlex' style = {{ height: '100%' }}>
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
        </div>
    </div>;
}