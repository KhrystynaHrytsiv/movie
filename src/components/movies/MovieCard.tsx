import {FC, PropsWithChildren, useState} from "react";
import {poster} from "../../services";
import {useNavigate} from "react-router-dom";
import {IMovie} from "../../interfaces";
import { IoIosMore } from "react-icons/io";
import css from './Card.module.css'

interface IProps extends PropsWithChildren{
    movie:IMovie,
}

const MovieCard: FC<IProps> = ({movie}) => {
    const {id, title, poster_path, vote_average, name, release_date} = movie;
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const rating = Number(vote_average.toFixed(1))

    const navigation = ()=>{
        const type = title ? 'movie' : 'tv';
        navigate(`/${type}/${id}/${title || name}`)
    }
    return (
        <div className={css.movie}  onClick={navigation} onMouseEnter={()=> setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
            <img src={`${poster}/${poster_path}`} alt={title} className={css.img}/>
            {isHovered && (
                <div className={css.hover}>
                    <div className={css.imgContainer}>
                     <img src={`${poster}/${poster_path}`} alt={title} className={css.img}/>
                    </div>
                    <div className={css.infoContainer}>
                        <h3 className={css.title}> {title ? title : name} </h3>
                        <div className={css.info}>
                        <div> Release year: {release_date && new Date(release_date).getFullYear()}</div>
                            <span>|</span>
                        <div>Rating: {rating}+</div>
                        <IoIosMore title='More Info'/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { MovieCard };