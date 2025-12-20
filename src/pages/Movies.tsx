import {useAppDispatch, useAppSelector} from "../hook/reduxHooks";
import {useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import {movieActions} from "../redux/slices/movieSlice";
import {MovieCard, Pagination, Sorting} from "../components";
import css from '../components/movies/Movies.module.css'


const Movies = () => {
    const {filter, genreId, actorId, rating, year} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page:'1'});
    const page = +query.get('page')

    useEffect(() => {
        dispatch(movieActions.getAll({type: 'movie', params: {page, genreId, actorId, rating, year}}))
    }, [dispatch, page, genreId, actorId, rating, year]);

    return (
        <div className={css.Movies}>
            <Sorting type='movie'/>
            {filter.map(m => <MovieCard key={m.id} movie={m} />)}

            <Pagination/>
        </div>
    );
};


export {Movies};