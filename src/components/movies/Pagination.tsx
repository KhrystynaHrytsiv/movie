import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {useSearchParams} from "react-router-dom";
import {movieActions} from "../../redux/slices/movieSlice";

const Pagination = () => {
  const {page, total_page} = useAppSelector(state => state.movies);
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

    return (
        <div>
            <button disabled={page===1} onClick={prev}>prev</button>
            <button disabled={page===total_page} onClick={next}>next</button>
        </div>
    );
};

export {Pagination};