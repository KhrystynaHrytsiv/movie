import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import css from './Header.module.css'
import {useAppDispatch} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";

const Header = () => {
    const [theme, setTheme] = useState('light')
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = theme === 'light' ? css.light : css.dark;
    }, [theme]);

    const changeTheme = ()=>{
        setTheme(prev =>(prev=== 'light' ? 'dark': 'light') )
    }

    const movies = () => {
        dispatch(movieActions.setGenre(null));
        dispatch(movieActions.showAll());
        dispatch(movieActions.getAll({ page: 1 }));
        navigate("/movies");
    };

    return (
        <div className={css.header}>
            <div onClick={movies}>Movies</div>
            <Link to={'genres'}>Genres</Link>
            <Link to={'search'}>Search</Link>
            <div onClick={changeTheme}>{theme === 'light' ? '🌙' : '☀️'} Theme</div>
            <img src={'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-File.png'}
                 alt={'account'} className={css.photo}/>

        </div>
    );
};

export {Header};