import React, {useEffect} from 'react';
import css from './Movies.module.css'
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {Movie} from "./Movie";
import {useSearchParams} from "react-router-dom";
import {Pagination} from "./Pagination";


const Movies = () => {
    const { filter, genreId, movies} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page:'1'});
    const page = +query.get('page')

    // useEffect(() => {
    //     dispatch(movieActions.getAll({page, genreId}))
    // }, [dispatch, page, genreId]);

    useEffect(() => {
        if (genreId) {
            dispatch(movieActions.getAll({ page, genreId }));
        } else {
            dispatch(movieActions.getAll({ page }));
        }
    }, [dispatch, page, genreId]);

    return (
        <div className={css.Movies}>
            {genreId ?
                filter.map(m => <Movie key={m.id} movie={m} />)
                :movies.map(m=> <Movie movie={m} key={m.id}/>)}
            <Pagination/>
        </div>
    );
};


export {Movies};
