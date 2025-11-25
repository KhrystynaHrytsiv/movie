import {FC, PropsWithChildren} from "react";
import {poster} from "../../services";
import css from './Movie.module.css'
import {useNavigate} from "react-router-dom";
import {IMovie} from "../../interfaces";

interface IProps extends PropsWithChildren{
    movie:IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path} = movie;
    const navigate = useNavigate();
    return (
        <div className={css.movie}  onClick={()=> navigate(`/movies/${id}/${title}`)}>
            <img src={`${poster}/${poster_path}`} alt={title} className={css.img}/>
            <h3 className={css.title}> {title} </h3>
        </div>
    );
};

export { Movie };