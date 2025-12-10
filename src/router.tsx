import {createHashRouter, Navigate} from "react-router-dom";
import {GenresPage, MainPage, MovieDetailsPage, MoviePage, SearchPage, TvShows, Home} from "./pages";
import {movieService} from "./services";



const router = createHashRouter([
    {path: '', element:<MainPage/>  , children:[
            {index:true, element:<Home/>},
            {path: 'movies', element:<MoviePage/>},
            {path: 'movies/:genreName', element:<MoviePage/>},
            {path: 'movies/:id/:title', element:<MovieDetailsPage/>, loader: ({params:{id}}) => movieService.getById(+id)},
            {path: 'tv', element:<TvShows/>},
            {path: 'genres', element:<GenresPage/>},
            {path: 'search', element:<SearchPage/>}
        ]}
]
);

export {router}