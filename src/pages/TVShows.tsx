import React, {useEffect} from 'react';
import css from '../components/movies/Movies.module.css'
import {useSearchParams} from "react-router-dom";
import {Pagination, MovieCard, Sorting} from "../components";
import {movieActions} from "../redux/slices/movieSlice";
import {useAppDispatch, useAppSelector} from "../hook/reduxHooks";


const TVShows = () => {
    const {filter, genreId, actorId, rating, year} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page:'1'});
    const page = +query.get('page')


    useEffect(() => {
        dispatch(movieActions.getAll({type: 'tv', params:{page, genreId, actorId, rating, year}}))
    }, [dispatch, page, genreId, actorId, rating, year]);
    return (
        <div className={css.Movies}>
            <Sorting type='tv'/>
            {filter.map(m => <MovieCard key={m.id} movie={m} />)}
            <Pagination/>
        </div>
    );
};


export {TVShows};