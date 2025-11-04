import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IImage, IMovie, IPagination, IPeople, IVideo} from "../../interfaces";
import {movieService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    movies:IMovie[],
    errors: boolean,
    filter: IMovie[],
    page:number,
    genreId: null,
    video: IVideo[],
    images: IImage[],
    actors: IPeople[]

}
const initialState:IState ={
    movies:[],
    errors: null,
    filter: [],
    page:1,
    genreId:null,
    video: [],
    images: [],
    actors: []
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
const search = createAsyncThunk<IPagination<IMovie>,{query:string, page?: number} >(
    'movieSlice/search',
    async ({query, page}, {rejectWithValue})=>{
       try{
         const {data} = await movieService.search(query, page);
         return data
       } catch (e) {
           return rejectWithValue(e)
       }
    }
)
const getVideo = createAsyncThunk<IVideo[], {id:number}>(
    'movieSlice/getVideo',
    async ({id}, {rejectWithValue})=>{
        try {
            const {data} = await movieService.video(id);
            return data.results
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
const getImages = createAsyncThunk<IImage[], {id:number}>(
    'movieSlice/getImages',
    async ({id}, {rejectWithValue})=>{
        try {
            const {data} = await movieService.images(id);
            return data.backdrops
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
const getActors = createAsyncThunk<IPeople[], {id:number}>(
    'movieSlice/getActors',
    async ({id}, {rejectWithValue}) => {
        try {
           const {data} = await movieService.people(id);
           return data.cast
        } catch (e) {
            return rejectWithValue(e)
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
            .addCase(getVideo.fulfilled, (state, action) => {
                state.video = action.payload
            })
            .addCase(getImages.fulfilled, (state, action)=>{
                state.images = action.payload
            })
            .addCase(getActors.fulfilled, (state, action)=>{
                state.actors = action.payload
            })
            .addMatcher(isFulfilled(getAll, search), (state, action)=>{
                state.movies = action.payload.results;
                state.filter = action.payload.results
                state.page = action.payload.page;

            })
            .addMatcher(isRejected(getAll, search, getVideo, getImages, getActors), state => {
                state.errors = true
            })


});
const {reducer:movieReducer, actions} = movieSlice;
const movieActions = {...actions, getAll, search, getVideo, getImages, getActors}

export {movieReducer, movieActions}

