import React, {useEffect, useState} from 'react';
import {BackgroundImage} from "../components/background/BackgroundImage";
import {movieService} from "../services";
import {Slider} from "../components";


const Home = () => {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] =useState([]);
    const [upcoming, setUpcoming] = useState([]);

    useEffect(() => {
        movieService.getMovieByType('movie','now_playing').then(({data})=>setNowPlaying(data.results))
        movieService.getMovieByType('tv','popular').then(({data})=>setPopular(data.results))
        movieService.getMovieByType('movie','top_rated').then(({data})=> setTopRated(data.results))
        movieService.getMovieByType('tv','top_rated').then(({data})=> setUpcoming(data.results))

    }, []);
    return (
        <div>
            <BackgroundImage/>
            <Slider movies={nowPlaying} title={'Now Playing Movies'}/>
            <Slider movies={popular} title={'Popular TV Shows'}/>
            <Slider movies={topRated} title={'Top Rated Movies'}/>
            <Slider movies={upcoming} title={'Top Rated TV Shows'}/>
        </div>
    );
};

export {Home};
