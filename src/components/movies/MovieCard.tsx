import React, {FC, PropsWithChildren, useEffect} from "react";
import {poster} from "../../services";
import {useNavigate} from "react-router-dom";
import css from './MovieDetails.module.css'
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {IMovie} from "../../interfaces";

interface IProps extends PropsWithChildren{
    movie:IMovie
}

const MovieCard: FC<IProps> = ({movie}) => {
    const {id, poster_path, overview, release_date, vote_average, popularity, title, genres} = movie;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {video, images, actors} = useAppSelector(state => state.movies);

    useEffect(() => {
        if(id){
            dispatch(movieActions.getVideo({id}));
            dispatch(movieActions.getImages({id}));
            dispatch(movieActions.getActors({id}))
        }
    }, [id, dispatch]);

    const sortingGenres = (genreName: string, genreId: number) => {
        dispatch(movieActions.setGenre(genreId));
        dispatch(movieActions.getAll({ page: 1, genreId }));
        dispatch(movieActions.setPage(1));
        navigate(`/movies/${genreName}`);
    };

    const sortingMoviesByActors = (actorId:number, actorsName:string)=>{
        dispatch(movieActions.setActorId(actorId));
        dispatch(movieActions.getAll({page:1, actorId}));
        dispatch(movieActions.setPage(1));
        navigate(`/movies/${actorsName}`)
    }

    return (
        <div className={css.container}>
            <h1> {title}</h1>
            <main className={css.main}>
                <div className={css.firstPart}>
                    <img src={`${poster}/${poster_path}`} alt={title} className={css.moviePoster}/>
                    <div className={css.details}>

                        <div> Release date: {release_date}</div>
                        <div> Vote average: {vote_average}</div>
                        <div> Popularity: {popularity}</div>
                        <p className={css.genres}>Genres: {genres.map(genre => (
                        <span onClick={() => sortingGenres(genre.name, genre.id)}> {genre.name} </span>))}</p>
                    </div>
                </div>
                <div className={css.secondPart}>
                    <div>
                        {video.filter(v=> v.site === 'YouTube' && v.type === 'Trailer').slice(0,1).map(v=>(
                            <iframe key={v.id} src={`https://www.youtube.com/embed/${v.key}`} title={v.name} allowFullScreen height={350} width={600}></iframe>))}
                    </div>
                        <p className={css.movieDescription}> {overview}</p>
                    <div>
                        {images.slice(0,8).map(i=> <img src={`${poster}/${i.file_path}`} alt={''} className={css.images}/>)}
                    </div>
                </div>
            </main>
            <section className={css.section}>
                <h1>Actors:</h1>
                    <div className={css.actors}>
                        {actors.slice(0, 24).map(actor =>(
                            actor.profile_path && (
                            <div onClick={()=> sortingMoviesByActors(actor.id, actor.name)}>
                                <img src={`${poster}/${actor.profile_path}`} alt={actor.name} className={css.img}/>
                               <p>{actor.name}</p>
                            </div>
                            )
                        ))}
                    </div>
            </section>
            </div>
    );
};

export {MovieCard};