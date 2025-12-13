import {useAppDispatch, useAppSelector} from "../hook/reduxHooks";
import {useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import {movieActions} from "../redux/slices/movieSlice";
import {MovieCard, Pagination} from "../components";
import css from '../components/movies/Movies.module.css'


const Movies = () => {
    const {filter, genreId, actorId} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page:'1'});
    const page = +query.get('page')

    useEffect(() => {
        dispatch(movieActions.getAll({type: 'movie', page, genreId, actorId}))
    }, [dispatch, page, genreId, actorId]);

    return (
        <div className={css.Movies}>
            {filter.map(m => <MovieCard key={m.id} movie={m} />)}
            <Pagination/>
        </div>
    );
};


export {Movies};