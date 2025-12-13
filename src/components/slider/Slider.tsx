import React, {FC, useState} from 'react';
import {IMovie} from "../../interfaces";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import css from './Slider.module.css'
import {useNavigate} from "react-router-dom";
import {MovieCard} from "../movies";
import {Expirience} from "./Expirience";

interface IProp {
    movies:IMovie[],
    title:string
}

const Slider:FC<IProp> = ({movies, title}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();
    const [showControls, setShowControls] = useState(false)
    const [sliderPosition, setSliderPosition] = useState(0)

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
        <section className={css.sliderContainer} onMouseEnter={()=>setShowControls(true)} onMouseLeave={()=>setShowControls(false)}>
            <h1>{title}</h1>
            <div className={css.wrapper}>
            <AiOutlineLeft onClick={handleLeft} className={`${css.buttons} ${css.left} ${!showControls ? css.hidden : ''}`}/>
                <div className={css.slider}>
                {movies.map(movie=><MovieCard movie={movie} key={movie.id} />)}
                </div>
                {/*<div className={css.slider}>*/}
                {/*{movies.map(movie=><Expirience movie={movie} key={movie.id} />)}*/}
                {/*</div>*/}
                {/*{movies.map(movie=><div onClick={()=>navigate(`/movies/${movie.id}/${movie.title}`)}><img src={`${poster}/${movie.poster_path}`} alt={movie.title}  className={css.img}/></div>)}*/}
            <AiOutlineRight onClick={handleRight} className={`${css.buttons} ${css.right} ${!showControls ? 'none' : ''}`}/>

            </div>
        </section>
    );
};

export {Slider};