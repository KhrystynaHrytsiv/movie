import React, {FC, useState} from 'react';
import {IMovie} from "../../interfaces";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {poster} from "../../services";
import css from './Slider.module.css'
import {useNavigate} from "react-router-dom";

interface IProp {
    movies:IMovie[]
}

const CardSlider:FC<IProp> = ({movies}) => {
    const [currentImage, setCurrentImage] = useState(0)
    const navigate = useNavigate();
    const handleLeft =() =>{
        if(currentImage > 0){
            setCurrentImage(prev=> prev -4)
        }
    }
    const handleRight =() => {
        if (currentImage < movies.length -1) {
            setCurrentImage(prev => prev + 4)
        }
    }
    return (
        <section className={css.slider}>
            <AiOutlineLeft onClick={handleLeft} className={`${css.buttons} ${css.left}`}/>
            <div className={css.container}>
                {movies.map(movie=><div onClick={()=>navigate(`/movies/${movie.id}/${movie.title}`)}><img src={`${poster}/${movie.poster_path}`} alt={movie.title} style={{ transform : `translateX(-${currentImage * 70}%)`}} className={css.img}/></div>)}
            </div>
            <AiOutlineRight onClick={handleRight} className={`${css.buttons} ${css.right}`}/>
        </section>
    );
};

export {CardSlider};