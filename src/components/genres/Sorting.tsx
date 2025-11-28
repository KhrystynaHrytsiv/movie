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
        <form  className={css.form}>
            <section onClick={() => filterMovie()}> All </section>
            {genres.map(genre => (
                <section onClick={() => filterMovie(genre.name, genre.id)}> {genre.name} </section>
            ))}

        </form>
    );
};

export {Sorting};
