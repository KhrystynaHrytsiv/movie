import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import css from './Header.module.css'

const Header = () => {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        document.body.className = theme === 'light' ? css.light : css.dark;
    }, [theme]);

    const changeTheme = ()=>{
        setTheme(prev =>(prev=== 'light' ? 'dark': 'light') )
    }


    return (
        <div className={css.header}>
            <Link to={'movies'}>Movies</Link>
            <Link to={'genres'}>Genres</Link>
            <Link to={'search'}>Search</Link>
            <div onClick={changeTheme}>{theme === 'light' ? '🌙' : '☀️'} Theme</div>
            <img src={'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-File.png'}
                 alt={'account'} className={css.photo}/>

        </div>
    );
};

export {Header};