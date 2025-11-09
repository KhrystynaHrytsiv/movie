import {apiService} from "./apiService";
import {urls} from "./urls";
import {IImage, IMovie, IPagination, IPeople, IRes, IVideo} from "../interfaces";


const movieService ={
    getAll:(page:number, genreId?:number, actorId?:number):IRes<IPagination<IMovie>> => apiService.get(urls.movies.base, {params:{page,  ...(genreId && { with_genres: genreId }), ...(actorId && { with_cast: actorId })}}),
    getById:(id: number):IRes<IMovie> => apiService.get(urls.movies.byId(id)),
    search: (query:string, page: number): IRes<IPagination<IMovie>> => apiService.get(urls.search, {params:{query, page}}),
    video: (id:number):IRes<{results: IVideo[]}> => apiService.get(urls.video(id)),
    images: (id:number):IRes<{backdrops: IImage[]}> => apiService.get(urls.images(id)),
    people: (id:number):IRes<{cast: IPeople[]}> => apiService.get(urls.people(id))
}

export {movieService}