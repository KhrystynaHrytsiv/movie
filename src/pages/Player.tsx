import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hook/reduxHooks";
import {movieActions} from "../redux/slices/movieSlice";
import {useNavigate, useParams} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";


const Player = () => {
    const {video} = useAppSelector(state => state.movies);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const movieId =Number(id)

    useEffect(() => {
        if (movieId){
         dispatch(movieActions.getVideo({id: movieId}))
        }
    }, [movieId, dispatch]);
    return (
        <div style={{position:'relative'}}>
            <BsArrowLeft onClick={()=> navigate(-1)} style={{height:'40px', width:'40px', fontWeight: 'bold',position:"absolute", left: '10px', top: '20px', backgroundColor: 'rgba(229,229,229,0.5)', color: 'black', borderRadius: '50%'}}/>
            {video && video.filter(v => v.site === 'YouTube' && v.type === 'Trailer').length > 0 ? (
                    video.filter(v => v.site === 'YouTube' && v.type === 'Trailer').slice(0, 1).map(v => (
                        <iframe key={v.id} src={`https://www.youtube.com/embed/${v.key}`} title={v.name} allowFullScreen style={{height: '100vh', width:'100vw'}}></iframe>)))
                : (<h1>Trailer not found</h1>)}
        </div>
    );
};

export {Player};