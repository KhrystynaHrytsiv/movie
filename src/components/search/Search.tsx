import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../hook/reduxHooks";
import { movieActions } from "../../redux/slices/movieSlice";
import { useSearchParams } from "react-router-dom";
import { MovieCard, Pagination } from '..';
import css from './Search.module.css';
import cs1 from '../movies/Movies.module.css';

const Search = () => {
    const dispatch = useAppDispatch();
    const { filter, searchQuery } = useAppSelector(state => state.movies);

    const [query, setQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +(searchParams.get('page') ?? 1);

    const search = (e: FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        dispatch(movieActions.setSearchQuery(query));
        setSearchParams({ page: '1' });
    };

    useEffect(() => {
        if (!searchQuery) return;
        dispatch(movieActions.search({ query: searchQuery, page }));
    }, [dispatch, page, searchQuery]);
    console.log(filter);
    return (
        <div>
            <form onSubmit={search} className={css.search}>
                <div className={css.container}>
                    <input type={'text'} value={query} placeholder={'Search'} onChange={(e)=>setQuery(e.target.value)} className={css.input}/>
                    <button className={css.button}>Search</button>
                </div>
            </form>
            <div className={cs1.Movies}>
                {filter.length > 0 ? (
                    filter.map(m => (<MovieCard key={m.id} movie={m} />))) : searchQuery ?
                    <h2>🔍 No results found</h2>
                 : null}
            </div>
            <div className={css.pagination}><Pagination/></div>
        </div>
    );
};

export {Search};
