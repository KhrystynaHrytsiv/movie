import React, {FC, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {genreActions} from "../../redux/slices/genreSlice";
import css from './Sorting.module.css'
import {useNavigate} from "react-router-dom";
import {MediaType} from "../../services";

interface IProps {
   type:MediaType
}
const Sorting:FC<IProps> = ({type}) => {
    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.genres);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(genreActions.getAll())
    }, [dispatch]);

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 50 }, (_, i) => currentYear - i);
    }, []);


    const filterByGenre =(genreName?:string, genreId?: number) =>{
        if (genreId) {
            dispatch(movieActions.setGenre(genreId));
            navigate(`/${type}/${genreName}`);
        } else {
            dispatch(movieActions.showAll());
            navigate(`/${type}`)
        }
    }

    const filterByYear = (year?:number) =>{
        if(year){
            dispatch(movieActions.setYear(year));
        } else {
            dispatch(movieActions.showAll())
        }
    }

    const filterByRating = (rating?: number)=>{
        if (rating){
            dispatch(movieActions.setRatingFilter(rating));
        }
        dispatch(movieActions.showAll())
    }

    return (
        <div className={css.container}>
            <select
                className={css.genres} onChange={(e) => {
                const value = e.target.value;
                if (value === "all") return filterByGenre();
                const genre = genres.find(g => g.id.toString() === value);
                filterByGenre(genre.name, genre.id)}}>
                <option value="all">Genres: All</option>
                {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>
            <select className={css.years} onChange={e => filterByYear(Number(e.target.value))}>
                <option value="">All years</option>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <select  className={css.rating} onChange={(e) => filterByRating(Number(e.target.value))}>
                <option value="">All ratings</option>
                {[10, 9, 8, 7, 6, 5].map(r => (
                    <option key={r} value={r}>{r}+</option>
                ))}
            </select>
            <button onClick={()=>dispatch(movieActions.reset())} className={css.reset}>Reset</button>
        </div>
    );
};

export {Sorting};
