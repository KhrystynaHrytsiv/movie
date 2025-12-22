import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {IMovie} from "../../interfaces";


export const selectFilteredMovies = createSelector(
    [
        (state: RootState) => state.movies.movies,
        (state: RootState) => state.movies.genreId,
        (state: RootState) => state.movies.year,
        (state: RootState) => state.movies.rating,
    ],
    (movies: IMovie[], genreId, year, rating) => {
        return movies.filter((movie: IMovie) => {
            const byGenre =
                !genreId || movie.genre_ids.includes(genreId);

            const byYear =
                !year || movie.release_date.startsWith(String(year));

            const byRating =
                !rating || movie.vote_average >= rating;

            return byGenre && byYear && byRating;
        });
    }
);