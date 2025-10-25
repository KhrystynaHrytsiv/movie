import {IRes} from "../interfaces/IRes";
import {IMovie} from "../interfaces/IMovie";
import {apiService} from "./apiService";
import {urls} from "./urls";
import {IPagination} from "../interfaces/IPagination";

const movieService ={
    getAll:(page:number, genreId?:number):IRes<IPagination<IMovie>> => apiService.get(urls.movies.base, {params:{page,  ...(genreId && { with_genres: genreId })}}),
    getById:(id: number):IRes<IMovie> => apiService.get(urls.movies.byId(id)),
    search: (query:string, page: number): IRes<IPagination<IMovie>> => apiService.get(urls.search, {params:{query, page}})
}

export {movieService}