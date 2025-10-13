import {IRes} from "../interfaces/IRes";
import {IMovie} from "../interfaces/IMovie";
import {apiService} from "./apiService";
import {urls} from "./urls";
import {IPagination} from "../interfaces/IPagination";

const movieService ={
    getAll:(page:number):IRes<IPagination<IMovie>> => apiService.get(urls.movies.base, {params:{page}}),
    getById:(id: number):IRes<IMovie> => apiService.get(urls.movies.byId(id))
}

export {movieService}