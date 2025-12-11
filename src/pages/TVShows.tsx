import React, {useEffect} from 'react';
import css from '../components/movies/Movies.module.css'
import {useSearchParams} from "react-router-dom";
import {Pagination, Movie} from "../components";
import {movieActions} from "../redux/slices/movieSlice";
import {useAppDispatch, useAppSelector} from "../hook/reduxHooks";


const TVShows = () => {
    const {filter, genreId, actorId} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page:'1'});
    const page = +query.get('page')

    useEffect(() => {
        dispatch(movieActions.getAll({type: 'tv', page, genreId, actorId}))
    }, [dispatch, page, genreId, actorId]);

    return (
        <div className={css.Movies}>
            {filter.map(m => <Movie key={m.id} movie={m} />)}
            <Pagination/>
        </div>
    );
};


export {TVShows};