import { FC, PropsWithChildren } from "react";
import {IMovie} from "../../interfaces/IMovie";
import {poster} from "../../services";
import css from './Movie.module.css'

interface IProps extends PropsWithChildren{
    movie:IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {title, poster_path, vote_average } = movie;
    return (
        <div className={css.movie}>
            <img src={`${poster}/${poster_path}`} alt={title} className={css.img}/>
            <h3> {title} </h3>
            <div>{vote_average}</div>
        </div>
    );
};

export { Movie };