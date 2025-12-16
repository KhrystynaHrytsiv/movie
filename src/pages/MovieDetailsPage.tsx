import React from 'react';
import {useLoaderData} from "react-router-dom";
import {MovieDetails} from "../components";
import {Details} from '../components/movies/Details'

const MovieDetailsPage = () => {
    const {data} = useLoaderData();
    return (
        <div>
            {/*<MovieDetails movie={data}/>*/}
            <Details movie={data}/>
        </div>
    );
};

export {MovieDetailsPage};