import React, {useEffect} from 'react';
import {apiService, baseURL} from "../../services";
import {movieActions} from "../../redux/slices/movieSlice";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import css from './BackImage.module.css'

const BackgroundImage = () => {
    const dispatch = useAppDispatch();
    const {movies, backImages} = useAppSelector(state => state.movies);
    const fetchBackDropData = async ()=>{
        try{
            const {data} = await apiService.get(`${baseURL}/configuration`);
            dispatch(movieActions.setBackImage(data.images.secure_base_url + 'original'))
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        dispatch(movieActions.getMovieByType({type: 'popular'}))
        fetchBackDropData()
    }, [dispatch]);
    return (
        <section className={css.container}>
            {movies.slice(0, 10).map(movie =>
                <div className={css.movie}>
                    <img src={backImages+ movie.backdrop_path} alt={movie.title} style={{height: '100vh', width: '100vw'}}/>
                   <div className={css.title}>{movie.title}</div>
                </div>)}
        </section>
    );
};

export {BackgroundImage};