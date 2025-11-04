import React, {FC, PropsWithChildren} from "react";
import {IMovie} from "../../interfaces/IMovie";
import {poster} from "../../services";
import {useNavigate} from "react-router-dom";
import css from './MovieDetails.module.css'
import {useAppDispatch} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";

interface IProps extends PropsWithChildren{
    movie:IMovie
}

const MovieCard: FC<IProps> = ({movie}) => {
    const {poster_path, overview, release_date, vote_average, popularity, title, genres} = movie;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToSorting = (genreName: string, genreId: number) => {
        dispatch(movieActions.setGenre(genreId));
        dispatch(movieActions.getAll({ page: 1, genreId }));
        dispatch(movieActions.setPage(1));
        navigate(`/movies/${genreName}`);
    };

    return (
        <>
            <h2 className={css.movieTitle}> {title}</h2>
        <div className={css.movieContent}>
            <img src={`${poster}/${poster_path}`} alt={title} className={css.moviePoster}/>
            <div className={css.details}>
            <p className={css.movieDescription}> {overview}</p>
            <div> Release date: {release_date}</div>
            <div> Vote average: {vote_average}</div>
            <div> Popularity: {popularity}</div>
            <p className={css.genres}>Genres: {genres.map(genre => (
                <span onClick={() => goToSorting(genre.name, genre.id)}> {genre.name} </span>))}</p>

        </div>
        </div>
        </>
    );
};

export {MovieCard};