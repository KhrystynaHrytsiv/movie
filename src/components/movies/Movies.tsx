import React, {useEffect} from 'react';
import css from './Movies.module.css'
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {Movie} from "./Movie";
import {useSearchParams} from "react-router-dom";

const Movies = () => {
    const {movies, page} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    // const [query, setQuery] = useSearchParams({page:'1'});
    // const page = query.get('page')  ;
    // useEffect(() => {
    //     setQuery({page: '1'})
    // }, []);

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