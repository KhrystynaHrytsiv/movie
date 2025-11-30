import React, {FC, PropsWithChildren, useEffect} from "react";
import {poster} from "../../services";
import {useNavigate} from "react-router-dom";
import css from './MovieDetails.module.css'
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {IMovie} from "../../interfaces";
import {Gallery, Stars} from "..";


interface IProps extends PropsWithChildren{
    movie:IMovie
}

const MovieCard: FC<IProps> = ({movie}) => {
    const {id, poster_path, overview, release_date, vote_average, popularity, title, genres, runtime} = movie;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {video, actors} = useAppSelector(state => state.movies);

    // useEffect(() => {
    //     if(id){
    //         dispatch(movieActions.getVideo({id}));
    //         dispatch(movieActions.getImages({id}));
    //         dispatch(movieActions.getActors({id}))
    //     }
    // }, [id, dispatch]);

    const sortingGenres = (genreName: string, genreId: number) => {
        dispatch(movieActions.setGenre(genreId));
        dispatch(movieActions.getAll({ page: 1, genreId }));
        dispatch(movieActions.setPage(1));
        navigate(`/movies/${genreName}`);
    };

    // const sortingMoviesByActors = (actorId:number, actorsName:string)=>{
    //     dispatch(movieActions.setActorId(actorId));
    //     dispatch(movieActions.getAll({page:1, actorId}));
    //     dispatch(movieActions.setPage(1));
    //     navigate(`/movies/${actorsName}`)
    // }

    const photo = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'

    return (
        <div className={css.container}>
            <main className={css.main}>
                <div className={css.firstPart}>
                    <h1> {title}</h1>
                    <img src={`${poster}/${poster_path}`} alt={title} className={css.moviePoster}/>
                    <div className={css.details}>
                        <div className={css.stars}><Stars rating={vote_average}/></div>
                        <div> Vote average: {vote_average}</div>
                        <div> Release date: {release_date}</div>
                        <div> Popularity: {popularity}</div>
                        <div> Running time: {runtime}</div>
                        <h3 className={css.genres}>Genres: {genres.map(genre => (
                            <span onClick={() => sortingGenres(genre.name, genre.id)}> {genre.name} </span>))}</h3>
                    </div>
                </div>
                <div className={css.secondPart}>
                    <div className={css.video}>
                        {video && video.filter(v => v.site === 'YouTube' && v.type === 'Trailer').length > 0 ? (
                            video.filter(v => v.site === 'YouTube' && v.type === 'Trailer').slice(0, 1).map(v => (
                                <iframe key={v.id} src={`https://www.youtube.com/embed/${v.key}`} title={v.name} allowFullScreen></iframe>)))
                        : (<h1>Trailer not found</h1>)}
                    </div>
                    <h2>Movie description</h2>
                    <p className={css.movieDescription}> {overview}</p>
                    <Gallery/>
                    </div>
            </main>
            {/*<section className={css.section}>*/}
            {/*    <h1>Actors:</h1>*/}
            {/*    <div className={css.actors}>*/}
            {/*        {actors.slice(0, 18).map(actor => (*/}
            {/*            <div onClick={() => sortingMoviesByActors(actor.id, actor.name)}>*/}
            {/*                <img src={actor.profile_path ? `${poster}/${actor.profile_path}` : photo} alt={actor.name}*/}
            {/*                     className={css.img}/>*/}
            {/*                <p>{actor.name}</p>*/}
            {/*            </div>*/}
            {/*            )*/}
            {/*        )}*/}
            {/*        </div>*/}
            {/*</section>*/}
            </div>
    );
};

export {MovieCard};