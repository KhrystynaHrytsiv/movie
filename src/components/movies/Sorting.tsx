import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {IMovie} from "../../interfaces/IMovie";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {genreActions} from "../../redux/slices/genreSlice";

const Sorting = () => {
    const {register, handleSubmit, reset} = useForm<IMovie>();
    const {genres} = useAppSelector(state => state.genres);
    const [selectGenre, setSelectGenre] = useState('all genres')
    const dispatch = useAppDispatch();
    useEffect(() => {
       dispatch(genreActions.getAll())
    }, [dispatch]);
    return (
        <form>
            <select value={selectGenre} onChange={(e)=> setSelectGenre(e.target.value)}>
                {genres.map(genre =>(
                    <option key={genre.id}> {genre.name}</option>) )}
            </select>
        </form>
    );
};

export {Sorting};