import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {genreActions} from "../../redux/slices/genreSlice";
import css from './Sorting.module.css'
import {useNavigate} from "react-router-dom";


const Sorting = () => {
    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.genres);
    const {movies, filter} = useAppSelector(state => state.movies);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(genreActions.getAll())
    }, [dispatch]);

    const years = useMemo(() =>{
        return Array.from(
            new Set(filter.map(movie =>movie.release_date?.split('-')[0]).filter(Boolean)))
                .sort((a, b)=> Number(b) - Number(a))
    }, [filter])


    const filterMovie =(genreName?:string, genreId?: number) =>{
        if (genreId) {
            dispatch(movieActions.setGenre(genreId));
            dispatch(movieActions.getAll({ type: 'movie', page: 1, genreId }));
            dispatch(movieActions.setPage(1));
            navigate(`/movies/${genreName}`);
        } else {
            dispatch(movieActions.showAll());
            navigate(`/movies`);
        }
    }

    const filterByYear = (year?:number) =>{
        if(year){
            dispatch(movieActions.setYear(year));
            dispatch(movieActions.getAll({page: 1, year}))
        } else {
            dispatch(movieActions.showAll())
        }
    }
    // const filterRating =(rating: number) =>{
    //     if(rating) {
    //         dispatch(movieActions.setRatingFilter(rating))
    //         dispatch(movieActions.getAll({page: 1, rating}))
    //         dispatch(movieActions.setPage(1));
    //         navigate(`/movies`)
    //     } else {
    //         dispatch(movieActions.showAll());
    //         navigate(`/movies`);
    //     }
    // }

    return (
        <div className={css.container}>

            <select className={css.years} onChange={(e) => filterByYear(Number(e.target.value))}>
                <option value="">All years</option>
                {years.map(year =>
                    <option key={year} value={year}>{year}</option>)}
            </select>


            <select className={css.genres}>
                <option onChange={() => filterMovie()}> All</option>
                {genres.map(genre => (
                    <option onChange={() => filterMovie(genre.name, genre.id)}> {genre.name} </option>))}
            </select>
            <select
                className={css.genres} onChange={(e) => {
                const value = e.target.value;
                if (value === "all") return filterMovie();
                const genre = genres.find(g => g.id.toString() === value);
                filterMovie(genre.name, genre.id)
            }}>
                <option value="all">Genres: All</option>
                {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>
            {/*<select className={css.rating}>*/}
            {/*    <option>Rating</option>*/}
            {/*    <option onChange={()=> filterRating(1)}>1</option>*/}
            {/*    <option onChange={()=> filterRating(2)}>2</option>*/}
            {/*    <option onChange={()=> filterRating(3)}>3</option>*/}
            {/*    <option onChange={()=> filterRating(4)}>4</option>*/}
            {/*    <option onChange={()=> filterRating(5)}>5</option>*/}
            {/*    <option onChange={()=> filterRating(6)}>6</option>*/}
            {/*    <option onChange={()=> filterRating(7)}>7</option>*/}
            {/*    <option onChange={()=> filterRating(8)}>8</option>*/}
            {/*    <option onChange={()=> filterRating(9)}>9</option>*/}
            {/*    <option onChange={()=> filterRating(10)}>10</option>*/}
            {/*</select>*/}
            <button>reset</button>
        </div>
    );
};

export {Sorting};
