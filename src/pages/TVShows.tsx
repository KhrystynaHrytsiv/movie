import React, {useEffect} from 'react';
import css from '../components/movies/Movies.module.css'
import {useSearchParams} from "react-router-dom";
import {Pagination, MovieCard, Sorting, Actor} from "../components";
import {movieActions} from "../redux/slices/movieSlice";
import {useAppDispatch, useAppSelector} from "../hook/reduxHooks";


const TVShows = () => {
    const {filter, genreId, actorId, rating, year, page: reduxPage} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams({page:'1'});
    const urlPage =  +(query.get('page') ?? 1);
    const page = reduxPage !== urlPage && reduxPage === 1 ? reduxPage : urlPage;


    useEffect(() => {
        if (!query.get('page')) setQuery({ page: '1' });
        dispatch(movieActions.getAll({type: 'tv', params:{page, genreId, actorId, rating, year}}))
    }, [dispatch, page, genreId, actorId, rating, year]);
    return (
        <div className={css.content}>
            <div className={css.filters}><Sorting type='tv'/></div>
            {actorId && <Actor/>}
            <div className={css.Movies}>{filter.map(m => <MovieCard key={m.id} movie={m} />)}</div>
            <div className={css.paginationWrapper}><Pagination/></div>
        </div>
    );
};


export {TVShows};