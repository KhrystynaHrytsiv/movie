import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../interfaces/IMovie";
import {IPagination} from "../../interfaces/IPagination";
import {movieService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    movies:IMovie[],
    errors: boolean,
    prevPage:IPagination<any>,
    nextPage:IPagination<any>
}
const initialState:IState ={
    movies:[],
    errors: null,
    prevPage: null,
    nextPage: null
}

const getAll = createAsyncThunk<IPagination<IMovie>, void>(
    'movieSlice/getAll',
    async (_, {rejectWithValue} ) =>{
        try{
           const {data} = await movieService.getAll();
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
    reducers:{},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action)=>{
                state.movies = action.payload.results
            })
            .addCase(getAll.rejected, state => {
                state.errors = true
            })


});
const {reducer:movieReducer, actions} = movieSlice;
const movieActions = {...actions, getAll}

export {movieReducer, movieActions}

