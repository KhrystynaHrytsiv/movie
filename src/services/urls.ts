const baseURL = 'https://api.themoviedb.org/3'
const movies = '/movie';
const discover = '/discover/movie';
const genres = '/genre/movie/list';
const search = '/search/movie';
const video=(id: number):string => `/movie/${id}/videos`
const images = (id:number):string => `movie/${id}/images`
const people =(id: number): string=> `/movie/${id}/credits`

const poster = `https://image.tmdb.org/t/p/w500`

const urls ={
    movies:{
        base: discover,
        byId: (id: number): string => `${movies}/${id}`
    },
    genres,
    search,
    video,
    images,
   people
}
 export {baseURL, urls, poster}
