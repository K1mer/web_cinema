/** Модуль экспортирует компонент с счётчиком пользователей в комнате. */

import { useState } from 'react';

import { CinemaService } from '../services';


export const Users: React.FC = () => {
    const [ userAmount, setUserAmount ] = useState<number>( 1 );
    CinemaService.setUserAmountSetter( setUserAmount );

    return <div className = 'VerticalFlex right-container'>
        <div className = 'right-container__title'>
            Количество участников
        </div>
        <div className = 'user-counter' style = {{ padding: 8 }}>
            Working
        </div>
    </div>;
}
