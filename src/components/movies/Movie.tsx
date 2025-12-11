import {FC, PropsWithChildren} from "react";
import {poster} from "../../services";
import css from './Movie.module.css'
import {useNavigate} from "react-router-dom";
import {IMovie} from "../../interfaces";

interface IProps extends PropsWithChildren{
    movie:IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path, vote_average, name} = movie;
    const navigate = useNavigate();
    const rating = Number(vote_average.toFixed(1))

    const navigation = ()=>{
        const type = title ? 'movies' : 'tv';
        navigate(`/${type}/${id}/${title || name}`)
    }
    return (
        <div className={css.movie}  onClick={navigation}>
            <img src={`${poster}/${poster_path}`} alt={title} className={css.img}/>
            <h3 className={css.title}> {title ? title : name} </h3>
            <div className={css.rating}>{rating}</div>
        </div>
    );
};

export { Movie };