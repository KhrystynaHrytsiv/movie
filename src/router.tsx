import {createBrowserRouter, Navigate} from "react-router-dom";
import {GenresPage, MainPage, MovieDetailsPage, MoviePage, Search} from "./pages";
import {movieService} from "./services";

const router = createBrowserRouter([
    {path: '', element:<MainPage/>  , children:[
            {index:true, element:<Navigate to={'movies'}/>},
            {path: 'movies', element:<MoviePage/>},
            {path: 'movies/:genreName', element:<MoviePage/>},
            {path: 'movies/:id/:title', element:<MovieDetailsPage/>, loader: ({params:{id}}) => movieService.getById(+id)},
            {path: 'genres', element:<GenresPage/>},
            {path: 'search', element:<Search/>}
        ]}
]);

export {router}