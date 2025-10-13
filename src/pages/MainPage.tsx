import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../components/header/Header";
import {Pagination} from "../components/movies/Pagination";

const MainPage = () => {
    return (
        <div>
            <Header/>
          <Outlet/>
            <Pagination/>
        </div>
    );
};

export {MainPage};