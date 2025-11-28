import React from 'react';
import {useLoaderData} from "react-router-dom";
import {MovieCard} from "../components";

const MovieDetailsPage = () => {
    const {data} = useLoaderData();
    return (
        <div>
            <MovieCard movie={data}/>
        </div>
    );
};

export {MovieDetailsPage};