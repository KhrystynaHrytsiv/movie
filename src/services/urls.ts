const baseURL = 'https://api.themoviedb.org/3'
export type MediaType = 'movie' | 'tv';
export type MediaList = | 'popular' | 'top_rated' | 'upcoming' | 'now_playing' | 'on_the_air' | 'airing_today';

const configuration = '/configuration'
const discover = (type:MediaType):string => `/discover/${type}`;
const list = (type:MediaType, list:MediaList):string => `${type}/${list}`;
const genres = '/genre/movie/list';
const search = '/search/movie';
const video=(id: number, type:MediaType):string => `/${type}/${id}/videos`
const images = (id:number, type:MediaType):string => `${type}/${id}/images`
const people =(id: number, type:MediaType): string=> `/${type}/${id}/credits`

const poster = `https://image.tmdb.org/t/p/w500`

const urls ={
    discover, list, genres, search, video, images, people, configuration,
    byId: (id: number, type: MediaType): string => `/${type}/${id}`
}
 export {baseURL, urls, poster}
