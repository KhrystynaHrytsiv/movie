import {useAppDispatch, useAppSelector} from "../hook/reduxHooks";
import {useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import {movieActions} from "../redux/slices/movieSlice";
import {MovieCard, Pagination, Sorting, Actor} from "../components";
import css from '../components/movies/Movies.module.css'

const Movies = () => {
    const {filter, genreId, actorId, rating, year, page:reduxPage} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams({page:'1'});
    const urlPage =  +(query.get('page') ?? 1)
    const page = reduxPage !== urlPage && reduxPage === 1 ? reduxPage : urlPage;


    useEffect(() => {
        if (!query.get('page')) setQuery({ page: '1' });
        dispatch(movieActions.getAll({type: 'movie', params: {page, genreId, actorId, rating, year}}))
    }, [dispatch, page, genreId, actorId, rating, year]);

    return (
        <div className={css.content}>
            <div className={css.filters}><Sorting type='movie'/></div>
            {actorId && <Actor/>}
            <div className={css.Movies}>{filter.map(m => <MovieCard key={m.id} movie={m} />)}</div>
            <div className={css.paginationWrapper}><Pagination/></div>
        </div>
    );
};


export {Movies};