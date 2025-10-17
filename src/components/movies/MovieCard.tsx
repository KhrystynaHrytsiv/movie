import { FC, PropsWithChildren } from "react";
import {IMovie} from "../../interfaces/IMovie";

interface IProps extends PropsWithChildren{
    movie:IMovie
}

const MovieCard: FC<IProps> = ({movie}) => {
    const {original_title, poster_path, overview, release_date, vote_average, popularity, title } = movie;

    return (
        <div>
             <h2> {original_title}</h2>
             <img src={poster_path} alt={title}/>
             <p> {overview}</p>
             <div> Release date:{release_date}</div>
             <div> Vote average:{vote_average}</div>
             <div> Popularity: {popularity}</div>
        </div>
    );
};

export { MovieCard };