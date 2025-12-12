import React, {FC, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import css from './Header.module.css'
import {SiThemoviedatabase} from "react-icons/si";
import { CgProfile } from "react-icons/cg";
interface IProp {
    isScrolled: boolean
}

const Header:FC<IProp> = ({isScrolled}) => {
    const [theme, setTheme] = useState('light')
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = theme === 'light' ? css.light : css.dark;
    }, [theme]);

    const changeTheme = ()=>{
        setTheme(prev =>(prev=== 'light' ? 'dark': 'light') )
    }


    return (
        <div className={`${css.header} ${isScrolled ? css.scrolled : ''}`}>
            <div className={css.nav}>
            <SiThemoviedatabase onClick={() => navigate('/')} className={css.icon}/>
            <Link to={'movies'}>Movies</Link>
            <Link to={'tv'}>TV Shows</Link>
            <Link to={'search'}>Search</Link>
            <div onClick={changeTheme}>{theme === 'light' ? '🌙' : '☀️'} Theme</div>
                <CgProfile className={css.photo}/>
            </div>
        </div>
    );
};

export {Header};