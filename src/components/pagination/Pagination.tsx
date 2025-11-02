import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {useSearchParams} from "react-router-dom";
import {movieActions} from "../../redux/slices/movieSlice";

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

    return (
        <div style={{justifyContent:'space-between', display:'flex', height: '30px', width:'300px'}}>
            <button disabled={page===1} onClick={prev} style={{height: '30px', width:'100px',  background:'#1fb9b9', color: '#01012c', borderRadius: '5px', border: 'none'}}>prev</button>
            <button disabled={page>=500} onClick={next} style={{height: '30px', width:'100px',  background:'#1fb9b9', color: '#01012c', borderRadius: '5px', border: 'none'}}>next</button>
        </div>
    );
};

export {Pagination};