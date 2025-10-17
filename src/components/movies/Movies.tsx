import React, {useEffect} from 'react';
import css from './Movies.module.css'
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {Movie} from "./Movie";
import {MovieCard} from "./MovieCard";


const Movies = () => {
    const {movies, page} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getAll({page}))
    }, [dispatch, page]);


    return (
        <div className={css.Movies}>
            {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}


        </div>
    );
};

export {Movies};