import React from 'react';
import {MovieCard} from "../components/movies/MovieCard";
import {useLoaderData} from "react-router-dom";

const MovieDetailsPage = () => {
    const {data} = useLoaderData();
    return (
        <div>
            <MovieCard movie={data}/>
        </div>
    );
};

export {MovieDetailsPage};