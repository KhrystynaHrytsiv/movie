import {IGenre} from "./IGenre";
import {IVideo} from "./IVideo";

export interface IMovie {
    id: number,
    original_title: string,
    genre_ids:number[]
    genres: IGenre[],
    overview: string,
    popularity: number
    poster_path: string,
    release_date: string,
    runtime: string
    title: string,
    vote_average: number,
    vote_count: number,
    video: IVideo[]
}