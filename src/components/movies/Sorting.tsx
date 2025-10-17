import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {IMovie} from "../../interfaces/IMovie";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {genreActions} from "../../redux/slices/genreSlice";

const Sorting = () => {
    const {handleSubmit} = useForm<IMovie>();
    const {genres} = useAppSelector(state => state.genres);
    const [selectGenre, setSelectGenre] = useState('all genres')
    const [sorting, setSorting] = useState('types')
    const sorting_movies = [
        {name: ' popular'},
        {name: ' top rated'},
        {name: ' upcoming'},
        
    ]
    const dispatch = useAppDispatch();


    useEffect( () => {
       dispatch(genreActions.getAll())
    }, [dispatch]);

    const choose = ()=>{

    }

    return (
        <form onSubmit={handleSubmit(choose)}>
            <select value={selectGenre} onChange={(e)=> setSelectGenre(e.target.value)}>
                {genres.map(genre =>(
                    <option key={genre.id}> {genre.name}</option>) )}
            </select>
                <select value={sorting} onChange={(e)=>setSorting(e.target.value)} >
                    <option>{sorting_movies.map(movie =><div>{movie.name}</div>)} </option>
                </select>
            <button> search</button>

        </form>
    );
};

export {Sorting};