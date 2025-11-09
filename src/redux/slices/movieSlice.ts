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
    actors: IPeople[],
    actorId: null

}
const initialState:IState ={
    movies:[],
    errors: null,
    filter: [],
    page:1,
    genreId:null,
    video: [],
    images: [],
    actors: [],
    actorId:null
}

const getAll = createAsyncThunk<IPagination<IMovie>,{page:number, genreId?: number, actorId?:number}>(
    'movieSlice/getAll',
    async ({page, genreId, actorId}, {rejectWithValue} ) =>{
        try{
           const {data} = await movieService.getAll(page, genreId, actorId);
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

