import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IImage, IMovie, IPagination, IParams, IPeople, IPerson, IVideo} from "../../interfaces";
import {MediaList, MediaType, movieService} from "../../services";
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
    backImages: string,
    actor:IPerson,
    total_page: number,
    searchQuery: null,
    cachedSearchPages: Record<number, IMovie[]>,
    totalSearchPages: number;
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
    backImages: '',
    actor: null,
    total_page: 1,
    searchQuery: null,
    cachedSearchPages: {},
    totalSearchPages:1
}


const getAll = createAsyncThunk<IPagination<IMovie>, { type: MediaType; params: IParams }>(
    'movieSlice/getAll',
    async ({ type, params }, { rejectWithValue }) => {
        try {
            const { data } = await movieService.getAll(type, params);
           return {
               ...data,
               results: data.results.filter(movie => Boolean(movie.poster_path))
           }
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

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
            return {
                ...data,
                results: data.results.filter(movie => Boolean(movie.poster_path))
            }
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)


// const search = createAsyncThunk<
//     { page: number; results: IMovie[]; totalPages: number },
//     { query: string; page: number },
//     { state: any }
// >(
//     'movieSlice/search',
//     async ({ query, page }, { rejectWithValue, getState }) => {
//         try {
//             const state = getState();
//             let cachedMovies: IMovie[] = state.movies.cachedMovies || [];
//
//             if (cachedMovies.length === 0 || state.movies.searchQuery !== query) {
//                 // Якщо кеш пустий або запит змінився — підвантажуємо всі сторінки API
//                 cachedMovies = [];
//                 let apiPage = 1;
//                 let totalApiPages = 1;
//
//                 while (apiPage <= totalApiPages) {
//                     const response = await movieService.search(query, apiPage);
//                     const data = response.data;
//                     totalApiPages = data.total_pages;
//
//                     cachedMovies.push(...data.results.filter(m => Boolean(m.poster_path)));
//
//                     apiPage++;
//                 }
//             }
//
//             const totalPages = Math.ceil(cachedMovies.length / 20);
//             const start = (page - 1) * 20;
//             const results = cachedMovies.slice(start, start + 20);
//
//             return { page, results, totalPages, cachedMovies };
//         } catch {
//             return rejectWithValue('Search failed');
//         }
//     }
// );

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

const getActorsInfo = createAsyncThunk<IPerson, {id:number}>(
    'movieSlice/getActorsInfo',
    async ({id}, {rejectWithValue}) =>{
        try{
           const {data} = await movieService.person(id);
           return data
        }catch (e) {
            return rejectWithValue(e);
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
        },
        setActorId: (state, action) => {
            state.actorId = action.payload;
            state.genreId = null;
        },
        setRating: (state, action) => {
            state.rating = action.payload;
        },
        setYear : (state, action)=>{
            state.year = action.payload;
        },
        setBackImage:(state, action)=>{
            state.backImages = action.payload
        },
        setSearchQuery:(state, action) =>{
            state.searchQuery = action.payload;
            state.page = 1;
        },
        reset: (state) =>{
            state.genreId = null;
            state.actorId = null;
            state.year = null;
            state.rating = null;
            state.actor = null;
            state.page = 1;
        },
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
            .addCase(getActorsInfo.fulfilled, (state, action)=>{
                state.actor = action.payload
            })
            .addCase(getAll.fulfilled, (state, action)=>{
                state.movies =action.payload.results;
                state.filter =action.payload.results;
                state.page = action.payload.page;
                state.total_page = action.payload.total_pages;
            })
            // .addCase(search.fulfilled, (state, action)=>{
            // state.cachedMovies = action.payload.cachedMovies;
            // state.totalPages = action.payload.totalPages;
            // state.page = action.payload.page;
            // state.searchResults = action.payload.results;
            // })
            .addMatcher(isRejected(getAll, search, getImages, getActors), state => {
                state.errors = true
            })

});
const {reducer:movieReducer, actions} = movieSlice;
const movieActions = {...actions, getAll, search, getVideo, getImages, getActors, getMovieByType, getActorsInfo}

export {movieReducer, movieActions}
