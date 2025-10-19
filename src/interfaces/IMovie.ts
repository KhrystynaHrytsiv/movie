import {IGenre} from "./IGenre";
import {IPeople} from "./IPeople";

export interface IMovie {
    id: number,
    original_title: string,
    genres: IGenre[],
    overview: string,
    popularity: number
    poster_path: string,
    release_date: string
    title: string,
    vote_average: number,
    vote_count: number,
    people: IPeople[]
}