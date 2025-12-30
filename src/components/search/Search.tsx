// import React, {useEffect, useState} from 'react';
// import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
// import {movieActions} from "../../redux/slices/movieSlice";
// import {useSearchParams} from "react-router-dom";
// import {MovieCard, Pagination} from '..';
// import css from './Search.module.css'
// import cs1 from '../movies/Movies.module.css'
//
// const Search = () => {
//     const dispatch = useAppDispatch();
//     const {filter, searchQuery} = useAppSelector(state => state.movies);
//     const [query, setQuery] = useState('');
//     const [searchParams, setSearchParams] = useSearchParams();
//     const page = +(searchParams.get('page') ?? 1);
//
//     useEffect(() => {
//         if (!query.trim()) return;
//
//         const timer = setTimeout(() => {
//             dispatch(movieActions.setSearchQuery(query));
//             setSearchParams({ page: '1' });
//         }, 500);
//
//         return () => clearTimeout(timer);
//     }, [query, dispatch, setSearchParams]);
//
//     useEffect(() => {
//         if (searchQuery) {
//             dispatch(movieActions.search({ query: searchQuery, page }));
//         }
//     }, [dispatch, page, searchQuery]);
//
//     return (
//         <div>
//             <div className={css.search}>
//                 <div className={css.container}>
//                     <input type="text" value={query} placeholder="Search" onChange={e => setQuery(e.target.value)} className={css.input}/>
//                     <button className={css.button}>Search</button>
//                 </div>
//             </div>
//             <div className={cs1.Movies}>
//                 {filter.map(m => <MovieCard movie={m} key={m.id} />)}</div>
//             <div className={css.pagination}><Pagination /></div>
//         </div>
//     );
// };
//
// export {Search};

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