import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainPage, MoviePage} from "./pages";

const router = createBrowserRouter([
    {path: '', element:<MainPage/>  , children:[
            {index:true, element:<Navigate to={'movies'}/>},
            {path: 'movies', element:<MoviePage/>}
        ]}
]);

export {router}