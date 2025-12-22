import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IImage, IMovie, IPagination, IParams, IPeople, IVideo} from "../../interfaces";
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
    year: number
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
    year: null,
    backImages: ''
}

const getAll = createAsyncThunk<IPagination<IMovie>,  {type:MediaType, params:IParams}>(
    'movieSlice/getAll',
    async ({type, params}, {rejectWithValue} ) =>{
        try{
            const {data} = await movieService.getAll(type, params);
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
        // setPage: (state, action) => {
        //     const { page, append } = action.payload;
        //     if (append) {
        //         // Додаємо нові фільми (наприклад, через extraReducers)
        //         state.page = page;
        //     } else {
        //         // Скидаємо фільми і встановлюємо сторінку
        //         state.page = page;
        //         state.movies = [];
        //         state.filter = [];
        //     }
        // },
        setGenre: (state, action)=>{
            state.genreId = action.payload;
            state.actorId = null;
        },
        showAll: state => {
            state.filter = state.movies;
        },
        setActorId: (state, action) => {
            state.actorId = action.payload;
            state.genreId = null;
        },
        setRating: (state, action) => {
            state.rating = action.payload;
            // state.rating = rating;
            // state.filter = state.movies.filter(movie => movie.vote_average >= rating);
        },
        setYear : (state, action)=>{
            state.year = action.payload;
        },
        setBackImage:(state, action)=>{
            state.backImages = action.payload
        },
        reset: (state) =>{
            state.genreId = null;
            state.year = null;
            state.rating = null;
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
                // state.movies = action.payload.results;
                // state.filter = action.payload.results;
                // state.page = action.payload.page;
                if (action.payload.page === 1) {
                    state.movies = action.payload.results;
                    state.filter = action.payload.results;
                } else {
                    state.movies = [...state.movies, ...action.payload.results];
                    state.filter = [...state.filter, ...action.payload.results];
                }
                state.page = action.payload.page;

            })
            .addMatcher(isRejected(getAll, search, getImages, getActors), state => {
                state.errors = true
            })


});
const {reducer:movieReducer, actions} = movieSlice;
const movieActions = {...actions, getAll, search, getVideo, getImages, getActors, getMovieByType}

export {movieReducer, movieActions}
