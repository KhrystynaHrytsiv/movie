import {createHashRouter} from "react-router-dom";
import {GenresPage, Home, MainPage, MovieDetailsPage, MoviePage, Player, SearchPage, TVShows} from "./pages";
import {movieService} from "./services";


const router = createHashRouter([
    {path: '', element:<MainPage/>  , children:[
            {index:true, element:<Home/>},
            {path: 'movies', element:<MoviePage/>},
            {path: 'movies/:genreName', element:<MoviePage/>},
            {path: 'movies/:id/:title', element:<MovieDetailsPage/>, loader: ({params:{id}}) => movieService.getById(+id)},
            {path: 'tv', element:<TVShows/>},
            {path: 'tv/:id/:name', element:<MovieDetailsPage/>, loader: ({params:{id}}) => movieService.getTVById(+id)},
            {path: 'genres', element:<GenresPage/>},
            {path: 'search', element:<SearchPage/>},
            {path: 'player/:id', element:<Player/>}
        ]}
]
);

export {router}