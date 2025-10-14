import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../interfaces/IMovie";
import {IPagination} from "../../interfaces/IPagination";
import {movieService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    movies:IMovie[],
    errors: boolean,
    page: number,
    totalPages: number;
}
const initialState:IState ={
    movies:[],
    errors: null,
    page: 1,
    totalPages: 0
}

const getAll = createAsyncThunk<IPagination<IMovie>,{page:number}>(
    'movieSlice/getAll',
    async ({page}, {rejectWithValue} ) =>{
        try{
           const {data} = await movieService.getAll(page);
           return data
        } catch (e) {
            const err = e as AxiosError
           return rejectWithValue(err.response.data)
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers:{
        pagination: (state, action) =>{
            state.page = action.payload
        // state.prevPage = action.payload.prev
        // state.nextPage = action.payload.next
}
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action)=>{
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;

            })
            .addCase(getAll.rejected, state => {
                state.errors = true
            })


});
const {reducer:movieReducer, actions} = movieSlice;
const movieActions = {...actions, getAll}

export {movieReducer, movieActions}

