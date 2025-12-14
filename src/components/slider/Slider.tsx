import React, {FC, useState} from 'react';
import {IMovie} from "../../interfaces";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import css from './Slider.module.css'
import {useNavigate} from "react-router-dom";
import {MovieCard} from "../movies";

interface IProp {
    movies:IMovie[],
    title:string
}

const Slider:FC<IProp> = ({movies, title}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();
    const [showControls, setShowControls] = useState(false);

    const handleLeft =() =>{
        if(currentImage > 0){
            setCurrentImage(prev=> prev -1)
        }
    }
    const handleRight =() => {
        if (currentImage < movies.length -1) {
            setCurrentImage(prev => prev + 1)
        }
    }
    return (
        <section className={css.sliderContainer} onMouseEnter={()=>setShowControls(true)} onMouseLeave={()=>setShowControls(false)}>
            <h1>{title}</h1>
            <div className={css.wrapper}>
                {currentImage > 0 && <AiOutlineLeft onClick={handleLeft} className={`${css.buttons} ${css.left} ${!showControls ? css.hidden : ''}`}/>}
                <div className={css.slider} style={{ transform : `translateX(-${currentImage * 250}px)`}}>
                {movies.map(movie=><MovieCard movie={movie} key={movie.id} />)}
                </div>
                {currentImage < movies.length -8 &&<AiOutlineRight onClick={handleRight} className={`${css.buttons} ${css.right} ${!showControls ? 'none' : ''}`}/>}

            </div>
        </section>
    );
};

export {Slider};