import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {useSearchParams} from "react-router-dom";
import {movieActions} from "../../redux/slices/movieSlice";
import css from './Pagination.module.css'

const Pagination = () => {
  const {page} = useAppSelector(state => state.movies);
  const dispatch = useAppDispatch();
    const [, setQuery] = useSearchParams({page:'1'});

    const prev =()=>{
        dispatch(movieActions.setPage(page -1))
        setQuery(prev1 => {
            prev1.set('page', `${+prev1.get('page')-1}`)
            return prev1
        })
    }

    const next =()=>{
        dispatch(movieActions.setPage(page+1))
        setQuery(prev1 => {
            prev1.set('page', `${+prev1.get('page')+1}`)
            return prev1
        })
    }
    // const goToPage = (num: number) => {
    //     dispatch(movieActions.setPage({ page: num, append: false }));
    // };
    //
    //
    // const loadMore = () => {
    //     dispatch(movieActions.setPage({ page: page + 1, append: true }));
    // };

    return (
        <div className={css.pagination}>
            <button disabled={page===1} onClick={prev}>Prev</button>
            <button disabled={page>=500} onClick={next}>Next</button>

            {/*<button disabled={page === 1} onClick={() => goToPage(page - 1)}>Назад</button>*/}
            {/*{[...Array(10)].map((_, i) => {*/}
            {/*    const num = i + 1;*/}
            {/*    return (*/}
            {/*        <button key={num} className={page === num ? css.active : ''} onClick={() => goToPage(num)}>{num}</button>*/}
            {/*    );*/}
            {/*})}*/}
            {/*<button onClick={loadMore}></button>*/}
        </div>
    );
};

export {Pagination};

