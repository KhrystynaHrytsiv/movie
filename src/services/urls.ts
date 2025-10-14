const baseURL = 'https://api.themoviedb.org/3'
const movies = '/movie';
const discover = '/discover/movie';
const genres = '/genre/movie/list'

const poster = `https://image.tmdb.org/t/p/w500`

const urls ={
    movies:{
        base: discover,
        byId: (id: number): string => `${movies}/${id}`
    },
    genres:{
        base: genres,
        byId:(id:number):string => `${genres}/${id}`
    }
}
 export {baseURL, urls, poster}
