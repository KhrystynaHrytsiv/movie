//         <form onSubmit={handleSubmit(choose)}>
//             <select value={selectGenre} onChange={(e) => setSelectGenre(e.target.value)}>
//                 {genres.map(genre => (
//                     <option key={genre.id}> {genre.name}</option>))}
//             </select>
//             <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
//                 <option>{sorting_movies.map(movie => <div>{movie.name}</div>)} </option>
//             </select>
//             <button> search</button>
//
//
//         </form>
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {genreActions} from "../../redux/slices/genreSlice";
import css from './Sorting.module.css'
import {useNavigate} from "react-router-dom";

const Sorting = () => {
    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.genres);
    const navigate = useNavigate();

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

    useEffect(() => {
        dispatch(genreActions.getAll())
    }, [dispatch]);
    return (
        <div  className={css.sort}>
            <div onClick={() => filterMovie()}> All </div>
            {genres.map(genre => (
                <div onClick={() => filterMovie(genre.name, genre.id)}> {genre.name} </div>
            ))}

        </div>
    );
};

export {Sorting};
