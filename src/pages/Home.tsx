import React, {useEffect, useState} from 'react';
import {BackgroundImage} from "../components/background/BackgroundImage";
import {movieService} from "../services";
import {Slider} from "../components/slider/Slider";


const Home = () => {
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
        <div>
            <BackgroundImage/>
            <Slider movies={upcoming} title={'Upcoming'}/>
            <Slider movies={nowPlaying} title={'Now Playing'}/>
            <Slider movies={topRated} title={'Top Rated'}/>
            <Slider movies={popular} title={'Popular'}/>
        </div>
    );
};

export {Home};
