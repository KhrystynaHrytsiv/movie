import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../components/header/Header";

const MainPage = () => {
    return (
        <div>
            <Header/>
          <Outlet/>
        </div>
    );
};

export {MainPage};