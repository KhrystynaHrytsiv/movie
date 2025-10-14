import {IRes} from "../interfaces/IRes";
import {IGenre} from "../interfaces/IGenre";
import {apiService} from "./apiService";
import {urls} from "./urls";

const genreService ={
    getAll: ():IRes<IGenre[]> => apiService.get(urls.genres.base),
    getById: (id:number): IRes<IGenre> => apiService.get(urls.genres.byId(id))
}
export {genreService}
