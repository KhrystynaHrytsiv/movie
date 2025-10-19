import {IRes} from "../interfaces/IRes";
import {IPeople} from "../interfaces/IPeople";
import {apiService} from "./apiService";
import {urls} from "./urls";

const peopleService={
    getById:(id:number):IRes<IPeople> => apiService.get(urls.people.byId(id))
}

export {peopleService}