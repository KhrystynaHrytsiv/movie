import React from 'react';
import { Link } from 'react-router-dom';
import css  from './Footer.module.css'
import {FaGithub, FaInstagram, FaLinkedin, FaTelegram} from "react-icons/fa";
import {SiGmail, SiThemoviedatabase} from 'react-icons/si';

const Footer = () => {
    return (
        <div className={css.footer}>
            <div className={css.container}>
                <div className={css.general}>
                    <SiThemoviedatabase/>
                    <p> Discover movies, actors and ratings from all over the world</p>
                </div>

                <div className={css.stuck}>
                    <ul> Built with:
                        <li>React </li>
                        <li>TypeScript</li>
                        <li>Redux Toolkit</li>
                        <li>React Router</li>
                        <li>Axios</li>
                        <li>Data provided by<Link to={'https://developer.themoviedb.org/reference'}> TMDB API</Link></li>
                    </ul>
                </div>
                <div className={css.linkContainer}>
                    <p>Social Media</p>
                    <div className={css.links}>
                    <Link to="https://github.com/KhrystynaHrytsiv/movie"><FaGithub/></Link>
                    <Link to="https://www.linkedin.com/in/khrystyna-hrytsiv-75b35038a/"> <FaLinkedin/></Link>
                    <Link to="https://t.me/khrystynka_hrytsiv"> <FaTelegram/></Link>
                    <Link to="https://www.instagram.com/khrystyna_hrytsiv?igsh=YTdwY2tudW5jeG5v/"> <FaInstagram/></Link>
                    </div>
                    <div>Contacts
                    <p>khrystyna.hrytsiv@gmail.com</p></div>
                </div>

            </div>
        </div>

    );
};

export {Footer};