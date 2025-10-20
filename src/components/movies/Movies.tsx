import React, {useEffect} from 'react';
import css from './Movies.module.css'
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {Movie} from "./Movie";
import {useSearchParams} from "react-router-dom";
import {Pagination} from "./Pagination";


const Movies = () => {
    const { filter} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page:'1'});
    const page = +query.get('page')

    useEffect(() => {
        dispatch(movieActions.getAll({page}))
    }, [dispatch, page]);


    return (
        <div className={css.Movies}>
            {/*{movies.map(movie => <Movie key={movie.id} movie={movie}/>)}*/}
            {filter.map(m => <Movie key={m.id} movie={m} />)}
            <Pagination/>
        </div>
    );
};

export {Movies};