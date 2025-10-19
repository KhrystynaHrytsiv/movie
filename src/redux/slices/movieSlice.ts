import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../interfaces/IMovie";
import {IPagination} from "../../interfaces/IPagination";
import {movieService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    movies:IMovie[],
    errors: boolean,
    page: number,
    filter: IMovie[]

}
const initialState:IState ={
    movies:[],
    errors: null,
    page: 1,
    filter: []
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
// const getById =createAsyncThunk<IMovie, {id:number}>(
//     'movieSlice/getById',
//     async ({id}, {rejectWithValue})=>{
//         try{
//             await movieService.getById(id)
//         } catch (e) {
//            return  rejectWithValue(e)
//         }
//     }
// )

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers:{
        setPage: (state, action)=>{
            state.page = action.payload;

        },
        filtered:(state, action) =>{
            const sorting =action.payload
            state.filter = state.movies.filter(m=> m.genres.includes(sorting))
        }

    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action)=>{
                state.movies = action.payload.results;
                // state.filter = action.payload
                state.page = action.payload.page;

            })
            .addCase(getAll.rejected, state => {
                state.errors = true
            })


});
const {reducer:movieReducer, actions} = movieSlice;
const movieActions = {...actions, getAll}

export {movieReducer, movieActions}

