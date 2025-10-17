import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainPage, MoviePage} from "./pages";
import {MovieCard} from "./components/movies/MovieCard";

const router = createBrowserRouter([
    {path: '', element:<MainPage/>  , children:[
            {index:true, element:<Navigate to={'movies'}/>},
            {path: 'movies', element:<MoviePage/>},
            {path: 'movies/:id', element:<MovieCard/>}
        ]}
]);

export {router}