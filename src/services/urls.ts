const baseURL = 'https://api.themoviedb.org/3'
const movies = '/movie';
const configuration = '/configuration'
const discover = (type:string):string => `/discover/${type}`;
const movieList = (type:string):string => `${movies}/${type}`;
const genres = '/genre/movie/list';
const search = '/search/movie';
const video=(id: number):string => `/movie/${id}/videos`
const images = (id:number):string => `movie/${id}/images`
const people =(id: number): string=> `/movie/${id}/credits`

const poster = `https://image.tmdb.org/t/p/w500`

const urls ={
    discover: (type: string): string => discover(type),
    movies:{
        byId: (id: number): string => `${movies}/${id}`
    },
    tv:{
        byId:(id:number):string => `tv/${id}`
    },
    movieList,
    genres,
    search,
    video,
    images,
   people,
    configuration
}
 export {baseURL, urls, poster}
