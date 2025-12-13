import {FC, PropsWithChildren, useState} from "react";
import {poster} from "../../services";
// import css from './MovieCard.module.css'
import {useNavigate} from "react-router-dom";
import {IMovie} from "../../interfaces";
import { IoIosMore } from "react-icons/io";
import css from './Card.module.css'

interface IProps extends PropsWithChildren{
    movie:IMovie,
}

const MovieCard: FC<IProps> = ({movie}) => {
    const {id, title, poster_path, vote_average, name} = movie;
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const rating = Number(vote_average.toFixed(1))

    const navigation = ()=>{
        const type = title ? 'movies' : 'tv';
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
                        <div>Rating: {rating}+</div>
                        <div className={css.info}>
                        <IoIosMore title='More Info'/>
                        </div>
                            {/*<div className={css.genres}>*/}
                            {/*    <ul className='flex'>{genres.map(genre => <li>{genre.name}</li>)}</ul>*/}
                            {/*</div>*/}
                    </div>
                </div>
            )}
            {/*<div className={css.rating}>{rating}</div>*/}
        </div>
    );
};

export { MovieCard };