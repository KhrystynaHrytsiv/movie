import {FC, PropsWithChildren} from "react";
import {IMovie} from "../../interfaces/IMovie";
import {poster} from "../../services";
import {useNavigate} from "react-router-dom";
import css from './MovieDetails.module.css'

interface IProps extends PropsWithChildren{
    movie:IMovie
}

const MovieCard: FC<IProps> = ({movie}) => {
    const {poster_path, overview, release_date, vote_average, popularity, title, genres} = movie;
    const navigate = useNavigate();

    return (
        <div className={css.details}>
             <h2> {title}</h2>
             <img src={`${poster}/${poster_path}`} alt={title}/>`
             <p> {overview}</p>
             <div> Release date: {release_date}</div>
             <div> Vote average: {vote_average}</div>
             <div> Popularity: {popularity}</div>
            <p onClick={()=> navigate(`/movies/genreId`)}>Genres: {genres? genres.map(genre => genre.name).join(', '): 'No genres'}</p>
            {/*<div>Actors: {people? people.map(person => <div>{person.name} <img src={person.profile_path} alt={person.name}/></div>): 'No one'}</div>*/}

        </div>
    );
};

export { MovieCard };