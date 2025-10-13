import React from 'react';
import {useAppSelector} from "../../hook/reduxHooks";
import {useSearchParams} from "react-router-dom";

const Pagination = () => {
    // const {nextPage, prevPage} = useAppSelector(state => state.movies);
    const [, setQuery] = useSearchParams();

    const prev =()=>{
        setQuery(prev1 => {
            prev1.set('page', `${+prev1.get('page')-1}`)
            return prev1
        })
    }

    const next =()=>{
        setQuery(prev1 => {
            prev1.set('page', `${+prev1.get('page')+1}`)
            return prev1
        })
    }
    return (
        <div>
            <button onClick={prev}>prev</button>
            <button onClick={next}>next</button>
        </div>
    );
};

export {Pagination};