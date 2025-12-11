import {apiService} from "./apiService";
import {urls} from "./urls";
import {IImage, IMovie, IPagination, IPeople, IRes, IVideo} from "../interfaces";


const movieService ={
    getAll:(type: string, page:number, genreId?:number, actorId?:number, rating?:number):IRes<IPagination<IMovie>> => apiService.get(urls.discover(type), {params:{page,  ...(genreId && { with_genres: genreId }), ...(actorId && { with_cast: actorId }), ...(rating && {rating})}}),
    getMovieByType:(type:string): IRes<IPagination<IMovie>> => apiService.get(urls.movieList(type)),
    getById:(id: number):IRes<IMovie> => apiService.get(urls.movies.byId(id)),
    getTVById:(id:number):IRes<IMovie> => apiService.get(urls.tv.byId(id)),
    search: (query:string, page: number): IRes<IPagination<IMovie>> => apiService.get(urls.search, {params:{query, page}}),
    video: (id:number):IRes<{results: IVideo[]}> => apiService.get(urls.video(id)),
    images: (id:number):IRes<{backdrops: IImage[]}> => apiService.get(urls.images(id)),
    people: (id:number):IRes<{cast: IPeople[]}> => apiService.get(urls.people(id))
}

export {movieService}