import {FC, PropsWithChildren} from "react";
import {IMovie} from "../../interfaces/IMovie";
import {poster} from "../../services";
import css from './Movie.module.css'
import {useNavigate} from "react-router-dom";

interface IProps extends PropsWithChildren{
    movie:IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path, vote_average } = movie;
    const navigate = useNavigate();
    return (
        <div className={css.movie}>
            <img src={`${poster}/${poster_path}`} alt={title} className={css.img} onClick={()=> navigate(`movies/${id}`)}/>
            <h3> {title} </h3>
            <div>{vote_average}</div>
        </div>
    );
};

export { Movie };