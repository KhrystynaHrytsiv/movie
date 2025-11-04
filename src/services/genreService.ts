import {IRes} from "../interfaces/IRes";
import {IGenre} from "../interfaces/IGenre";
import {apiService} from "./apiService";
import {urls} from "./urls";

const genreService ={
    getAll: ():IRes<{genres: IGenre[]}> => apiService.get(urls.genres),

}
export {genreService}
