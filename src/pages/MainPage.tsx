import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../components/header/Header";
import {Sorting} from "../components/genres/Sorting";

const MainPage = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            {/*<Sorting/>*/}
        </div>
    );
};

export {MainPage};