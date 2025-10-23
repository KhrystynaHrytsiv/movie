import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../interfaces/IMovie";
import {IPagination} from "../../interfaces/IPagination";
import {movieService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    movies:IMovie[],
    errors: boolean,
    filter: IMovie[],
    page:number,
    genreId: null,
}
const initialState:IState ={
    movies:[],
    errors: null,
    filter: [],
    page:1,
    genreId:null,
}

const getAll = createAsyncThunk<IPagination<IMovie>,{page:number, genreId?: number}>(
    'movieSlice/getAll',
    async ({page, genreId}, {rejectWithValue} ) =>{
        try{
           const {data} = await movieService.getAll(page, genreId);
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
        setPage: (state, action)=>{
            state.page = action.payload;
        },
        setGenre: (state, action)=>{
           state.genreId = action.payload
        },
        // filtered:(state, action) =>{
        //     const genre =action.payload
        //     state.filter = state.movies.filter((m) => Array.isArray(m.genre_ids) && m.genre_ids.includes(genre))
        // },
        showAll: state => {
            state.filter = state.movies;
            state.genreId = null;
        }

    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action)=>{
                state.movies = action.payload.results;
                state.filter = action.payload.results
                state.page = action.payload.page;

            })
            .addCase(getAll.rejected, state => {
                state.errors = true
            })


});
const {reducer:movieReducer, actions} = movieSlice;
const movieActions = {...actions, getAll}

export {movieReducer, movieActions}

