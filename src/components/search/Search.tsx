import React, {FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import css from './Search.module.css'
import cs1 from '../movies/Movies.module.css'
import {MovieCard, Pagination} from '..';


const Search = () => {
    const [query, setQuery] = useState('')
    const dispatch = useAppDispatch();
    const {filter} = useAppSelector(state => state.movies);

    const search =(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(query.trim()){
            dispatch(movieActions.search({query}))
        }
    }
    return (
        <form onSubmit={search} className={css.search}>
            <input type={'text'} value={query} placeholder={'search'} onChange={(e)=>setQuery(e.target.value)} className={css.input}/>
            <button className={css.button}>search</button>
            <div className={cs1.Movies}>{filter.map(m=><MovieCard movie={m} key={m.id}/>)}</div>
            {/*{filter.length === 0 && <div>Sorry, there are not results</div>}*/}
            {filter.length > 20 &&<Pagination/>}
        </form>
    );
};

export {Search};