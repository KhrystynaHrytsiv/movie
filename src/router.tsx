import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainPage, MoviePage} from "./pages";
import {MovieDetailsPage} from "./pages/MovieDetailsPage";
import {movieService} from "./services";
import {GenresPage} from "./pages/GenresPage";

const router = createBrowserRouter([
    {path: '', element:<MainPage/>  , children:[
            {index:true, element:<Navigate to={'movies'}/>},
            {path: 'movies', element:<MoviePage/>},
            {path: 'movies/:id/:title', element:<MovieDetailsPage/>, loader: ({params:{id}}) => movieService.getById(+id)},
            {path: 'genres', element:<GenresPage/>}
        ]}
]);

export {router}