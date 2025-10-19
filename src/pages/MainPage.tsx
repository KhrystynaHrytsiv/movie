import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../components/header/Header";
import {Pagination} from "../components/movies/Pagination";
import {Sorting} from "../components/movies/Sorting";

const MainPage = () => {
    return (
        <div>
            <Header/>
            {/*<Sorting/>*/}
          <Outlet/>
            {/*<Pagination/>*/}
        </div>
    );
};

export {MainPage};