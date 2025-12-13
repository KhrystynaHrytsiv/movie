import { FC, PropsWithChildren } from "react";
import {IMovie} from "../../interfaces";
import css from './exp.module.css'
import {poster} from "../../services";

interface IProps extends PropsWithChildren{
movie:IMovie
}

const Expirience: FC<IProps> = ({movie}) => {
    const {id, title, poster_path, vote_average, name, release_date} = movie;
    return (
        <div className={css.card}>
            <img src={`${poster}/${poster_path}`} alt={title} className={css.image}/>
            <div className={css.info}>
                <h2 className={css.title}> {title ? title : name}</h2>
                <div className={css.meta}>
                    <p>{release_date}</p>
                    <p className={css.rating}>Rating : {Number(vote_average).toFixed(1)}</p>
                </div>
            </div>
        </div>
    );
};

export {Expirience};