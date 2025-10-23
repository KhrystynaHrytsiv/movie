import {IRes} from "../interfaces/IRes";
import {IMovie} from "../interfaces/IMovie";
import {apiService} from "./apiService";
import {urls} from "./urls";

const searchService ={
    getAll:():IRes<IMovie> => apiService.get(urls.search)
}
export {searchService}
