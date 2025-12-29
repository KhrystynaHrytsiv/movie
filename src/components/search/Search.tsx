import React, {FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import css from './Search.module.css'
import cs1 from '../movies/Movies.module.css'
import {MovieCard, Pagination} from '..';


const Search = () => {
    const [query, setQuery] = useState('')
    const dispatch = useAppDispatch();
    const {filter, page} = useAppSelector(state => state.movies);


    const search =(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!query.trim()) return;
        dispatch(movieActions.setPage(1));
        dispatch(movieActions.search({ query, page: 1 }));
    };

    useEffect(() => {
        if(query){
            dispatch(movieActions.search({query, page}))
        }
    }, [page, dispatch]);

    return (
        <div>
        <form onSubmit={search} className={css.search}>
            <div className={css.container}>
            <input type={'text'} value={query} placeholder={'Search'} onChange={(e)=>setQuery(e.target.value)} className={css.input}/>
            <button className={css.button}>Search</button>
            </div>
        </form>
            <div className={cs1.Movies}>{filter.map(m=><MovieCard movie={m} key={m.id}/>)}</div>
            <div className={css.pagination}><Pagination/></div>
        </div>
    );
};

export {Search};