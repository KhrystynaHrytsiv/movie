import {apiService} from "./apiService";
import {MediaType, urls, MediaList} from "./urls";
import {IImage, IMovie, IPagination, IPeople, IRes, IVideo} from "../interfaces";


const movieService ={
    getAll:(type:MediaType, page:number, genreId?:number, actorId?:number, rating?:number, year?:number):IRes<IPagination<IMovie>> => apiService.get(
        urls.discover(type), {params:{page,  ...(genreId && { with_genres: genreId }), ...(actorId && { with_cast: actorId }), ...(rating && {rating}), ...(year && {year})}}),
    getMovieByType:(type:MediaType, list:MediaList): IRes<IPagination<IMovie>> => apiService.get(urls.list(type, list)),
    getById:(id: number,type:MediaType):IRes<IMovie> => apiService.get(urls.byId(id, type)),
    search: (query:string, page: number): IRes<IPagination<IMovie>> => apiService.get(urls.search, {params:{query, page}}),
    video: (id:number, type:MediaType):IRes<{results: IVideo[]}> => apiService.get(urls.video(id, type)),
    images: (id:number, type:MediaType):IRes<{backdrops: IImage[]}> => apiService.get(urls.images(id, type)),
    people: (id:number, type:MediaType):IRes<{cast: IPeople[]}> => apiService.get(urls.people(id, type))
}

export {movieService}