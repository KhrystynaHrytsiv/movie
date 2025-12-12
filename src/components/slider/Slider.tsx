import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {movieService} from "../../services";
import {CardSlider} from "./CardSlider";

interface IProps extends PropsWithChildren{}

const Slider: FC<IProps> = () => {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] =useState([]);
    const [upcoming, setUpcoming] = useState([]);
    useEffect(() => {
        movieService.getMovieByType('now_playing').then(({data})=>setNowPlaying(data.results))
        movieService.getMovieByType('popular').then(({data})=>setPopular(data.results))
        movieService.getMovieByType('top_rated').then(({data})=> setTopRated(data.results))
        movieService.getMovieByType('upcoming').then(({data})=> setUpcoming(data.results))

    }, []);

    return (
        <section>
                <h1>Upcoming</h1>
                <CardSlider movies={upcoming}/>
                <h1>Now Playing</h1>
                <CardSlider movies={nowPlaying}/>
                <h1>Top Rated</h1>
                <CardSlider movies={topRated}/>
                <h1>Popular</h1>
                <CardSlider movies={popular}/>

        </section>
    );
};

export {Slider};