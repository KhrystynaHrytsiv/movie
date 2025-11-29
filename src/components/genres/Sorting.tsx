import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {genreActions} from "../../redux/slices/genreSlice";
import css from './Sorting.module.css'
import {useNavigate} from "react-router-dom";

const Sorting = () => {
    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.genres);
    const {movies} = useAppSelector(state => state.movies);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(genreActions.getAll())
    }, [dispatch]);


    const filterMovie =(genreName?:string, genreId?: number) =>{
        if (genreId) {
            dispatch(movieActions.setGenre(genreId));
            dispatch(movieActions.getAll({ page: 1, genreId }));
            dispatch(movieActions.setPage(1));
            navigate(`/movies/${genreName}`);
        } else {
            dispatch(movieActions.showAll());
            navigate(`/movies`);
        }
    }

    const filterRating =(rating: number) =>{
        if(rating) {
            dispatch(movieActions.setRatingFilter(rating))
            dispatch(movieActions.getAll({page: 1, rating}))
            dispatch(movieActions.setPage(1));
            navigate(`/movies`)
        } else {
            dispatch(movieActions.showAll());
            navigate(`/movies`);
        }
    }


    return (
        <div className={css.container}>
            <select className={css.genres}>
                <option>Genres</option>
                <option onClick={() => filterMovie()}> All </option>
            {genres.map(genre => (
                <option onClick={() => filterMovie(genre.name, genre.id)}> {genre.name} </option>
            ))}
            </select>
            <select className={css.years}>
                <option>Years</option>

            </select>
            <select className={css.rating}>
                <option>Rating</option>
                <option onClick={()=> filterRating(1)}>1</option>
                <option onClick={()=> filterRating(2)}>2</option>
                <option onClick={()=> filterRating(3)}>3</option>
                <option onClick={()=> filterRating(4)}>4</option>
                <option onClick={()=> filterRating(5)}>5</option>
                <option onClick={()=> filterRating(6)}>6</option>
                <option onClick={()=> filterRating(7)}>7</option>
                <option onClick={()=> filterRating(8)}>8</option>
                <option onClick={()=> filterRating(9)}>9</option>
                <option onClick={()=> filterRating(10)}>10</option>
            </select>
        </div>
    );
};

export {Sorting};
