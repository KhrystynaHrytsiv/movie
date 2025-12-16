import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IImage, IMovie, IPagination, IPeople, IVideo} from "../../interfaces";
import {MediaType, movieService, MediaList} from "../../services";
import {AxiosError} from "axios";

interface IState {
    movies:IMovie[],
    errors: boolean | string,
    filter: IMovie[],
    page:number,
    genreId: null,
    video: IVideo[],
    images: IImage[],
    actors: IPeople[],
    actorId: null,
    rating: null,
    backImages: string

}
const initialState:IState ={
    movies:[],
    errors: null,
    filter: [],
    page: 1,
    genreId:null,
    video: [],
    images: [],
    actors: [],
    actorId:null,
    rating: null,
    backImages: ''
}

const getAll = createAsyncThunk<IPagination<IMovie>,{type:MediaType, page:number, genreId?: number, actorId?:number, rating?: number}>(
    'movieSlice/getAll',
    async ({type, page, genreId, actorId, rating}, {rejectWithValue} ) =>{
        try{
           const {data} = await movieService.getAll(type, page, genreId, actorId, rating);
           return data
        } catch (e) {
            const err = e as AxiosError
           return rejectWithValue(err.response.data)
        }
    }
)
const getMovieByType = createAsyncThunk<IMovie[],{type:MediaType, list:MediaList}>(
    'movieSlice/getByType',
    async ({type, list}, {rejectWithValue})=>{
        try {
        const {data} =await movieService.getMovieByType(type, list);
        return data.results
        } catch (e) {
           return rejectWithValue(e)
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
const getVideo = createAsyncThunk<IVideo[], {id:number, type:MediaType}>(
    'movieSlice/getVideo',
    async ({id, type}, {rejectWithValue})=>{
        try {
            const {data} = await movieService.video(id, type);
            return data.results
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)
const getImages = createAsyncThunk<IImage[], {id:number, type:MediaType}>(
    'movieSlice/getImages',
    async ({id, type}, {rejectWithValue})=>{
        try {
            const {data} = await movieService.images(id, type);
            return data.backdrops
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)
const getActors = createAsyncThunk<IPeople[], {id:number, type:MediaType}>(
    'movieSlice/getActors',
    async ({id, type}, {rejectWithValue}) => {
        try {
           const {data} = await movieService.people(id, type);
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
           state.genreId = action.payload;
            state.actorId = null;
        },
        showAll: state => {
            state.filter = state.movies;
            state.genreId = null;
        },
        setActorId: (state, action) => {
            state.actorId = action.payload;
            state.genreId = null;
        },
        setRatingFilter: (state, action) => {
            const rating = action.payload;
            state.rating = rating;
            state.filter = state.movies.filter(movie => movie.vote_average >= rating);
        },
        setBackImage:(state, action)=>{
            state.backImages = action.payload
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
            .addCase(getVideo.rejected, (state, action)=>{
                state.errors = action.payload as any
            })
            .addCase(getMovieByType.fulfilled, (state, action)=>{
                state.movies = action.payload
            })
            .addMatcher(isFulfilled(getAll, search), (state, action)=>{
                state.movies = action.payload.results;
                state.filter = action.payload.results;
                state.page = action.payload.page;

            })
            .addMatcher(isRejected(getAll, search, getImages, getActors), state => {
                state.errors = true
            })


});
const {reducer:movieReducer, actions} = movieSlice;
const movieActions = {...actions, getAll, search, getVideo, getImages, getActors, getMovieByType}

export {movieReducer, movieActions}

