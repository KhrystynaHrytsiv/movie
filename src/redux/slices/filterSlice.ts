import {createSlice} from "@reduxjs/toolkit";
import {MediaType} from "../../services";

interface IState {
   type: MediaType,
    genreId?: number,
    rating?: number,
    years?: number,
    page: number;
}

const  initialState: IState={
    type: 'movie',
    genreId: null,
    rating: null,
    years: null,
    page: 1
};
const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers:{
        setType: (state, action) => {
            state.type = action.payload;
        },
        setGenre: (state, action) => {
            state.genreId = action.payload;
        },
        setYear: (state, action) => {
            state.years = action.payload;
        },
        setRating: (state, action) => {
            state.rating = action.payload;
        },
        resetFilters: state => {
            state.genreId = null
            state.years = null
            state.rating = null
        }
    }
});
export const {reducer: filterReducer,actions: filtersActions} = filterSlice;
