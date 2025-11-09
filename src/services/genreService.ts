import {apiService} from "./apiService";
import {urls} from "./urls";
import {IGenre, IRes} from "../interfaces";

const genreService ={
    getAll: ():IRes<{genres: IGenre[]}> => apiService.get(urls.genres),

}
export {genreService}
