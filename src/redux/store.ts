import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices/movieSlice";
import {genreReducer} from "./slices/genreSlice";
import {peopleReducer} from "./slices/peopleSlice";

const store = configureStore({
    reducer:{
        movies: movieReducer,
        genres: genreReducer,
        people: peopleReducer
    }
});

export type RootState = ReturnType<typeof  store.getState>
export type AppDispatch = typeof store.dispatch

export {store}