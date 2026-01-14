import {createAsyncThunk, createSlice, isPending, isRejected} from "@reduxjs/toolkit";
import {IImage, IMovie, IPagination, IParams, IPeople, IPerson, IVideo} from "../../interfaces";
import {MediaList, MediaType, movieService} from "../../services";
import {AxiosError} from "axios";
import {RootState} from "../store";

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
    searchCache: Record<number, IMovie[]>;
    loading: boolean;
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
    searchCache: {},
    loading:false
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

export const selectMoviesByPage = (page: number) => (state: RootState) => {
    return state.movies.searchCache[page] ?? [];
};
const search = createAsyncThunk<
    { movies: IMovie[]; page: number; total_pages: number }, { query: string; page: number }, { state: RootState }>(
    'movieSlice/search',
    async ({ query, page }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const shownIds = new Set(Object.values(state.movies.searchCache).flat().map(m => m.id));
            let currentPage = page;
            let collected: IMovie[] = [];
            let totalPages = 1;

            while (collected.length < 20) {
                const { data } = await movieService.search(query, currentPage);
                totalPages = data.total_pages;

                const filtered = data.results
                    .filter(m => m.poster_path)
                    .filter(m => !shownIds.has(m.id));
                filtered.forEach(m => shownIds.add(m.id));
                collected.push(...filtered);
                currentPage++;
                if (currentPage > totalPages || data.results.length === 0) break;
            }
            return {
                movies: collected.slice(0, 20), page, total_pages: totalPages,
            };
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);
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
            state.searchCache = {};
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
            .addCase(getAll.fulfilled, (state, action)=>{
                state.movies =action.payload.results;
                state.filter =action.payload.results;
                state.page = action.payload.page;
                state.total_page = action.payload.total_pages;
            })
            .addCase(getVideo.fulfilled, (state, action) => {
                state.video = action.payload
            })
            .addCase(getImages.fulfilled, (state, action)=>{
                state.images = action.payload
            })
            .addCase(getActors.fulfilled, (state, action)=>{
                state.actors = action.payload
            })
            .addCase(getMovieByType.fulfilled, (state, action)=>{
                state.movies = action.payload
            })
            .addCase(getActorsInfo.fulfilled, (state, action)=>{
                state.actor = action.payload
            })
            .addCase(search.fulfilled, (state, action) => {
                state.searchCache[action.payload.page] = action.payload.movies;
                state.total_page = action.payload.total_pages;
                state.loading =false
            })

            .addCase(getVideo.rejected, (state, action)=>{
                state.errors = action.payload as any
            })
            .addMatcher(isPending(getAll, search, getImages, getActors, getMovieByType, getVideo, getActorsInfo), state => {
                state.loading =true;
                state.errors = null;
            })
            .addMatcher(isRejected(getAll, search, getImages, getActors), state => {
                state.errors = true
            })

});
const {reducer:movieReducer, actions} = movieSlice;
const movieActions = {...actions, getAll, search, getVideo, getImages, getActors, getMovieByType, getActorsInfo}

export {movieReducer, movieActions}
