import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../interfaces/IMovie";
import {IPagination} from "../../interfaces/IPagination";
import {movieService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    movies:IMovie[],
    errors: boolean,
    page:number
}
const initialState:IState ={
    movies:[],
    errors: null,
    page: null
}

const getAll = createAsyncThunk<IPagination<IMovie>, void>(
    'movieSlice/getAll',
    async (_, {rejectWithValue} ) =>{
        try{
           const {data} = await movieService.getAll(1);
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
        // pagination: (state, action) =>{
        // state.prevPage = action.payload.prev
        // state.nextPage = action.payload.next
// }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action)=>{
                const {page, results} = action.payload;
                state.movies = results;
                state.page = page
            })
            .addCase(getAll.rejected, state => {
                state.errors = true
            })


});
const {reducer:movieReducer, actions} = movieSlice;
const movieActions = {...actions, getAll}

export {movieReducer, movieActions}

