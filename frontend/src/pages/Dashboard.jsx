import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { setUserInfo } from "../utils/requests";
import {
    selectUserInfo,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../utils/selectors";

const Dashboard = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);

    const user = useSelector(selectUserInfo());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const moviesToSee = useSelector(selectUserMoviesToSee());

    const [uniqueMovies, setUniqueMovies] = useState([]);
    const [moviesSeenLinks, setMoviesSeenLinks] = useState([]);
    const [moviesToSeeLinks, setMoviesToSeeLinks] = useState([]);

    useEffect(() => {
        const allMoviesIds = user.moviesSeen.concat(user.moviesToSee);
        Promise.all(
            allMoviesIds.map((id) =>
                fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=fr`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((movie) => {
                        return {
                            id: movie.id,
                            link: (
                                <Link
                                    key={movie.id}
                                    id={movie.id}
                                    to={`/movies/${movie.id}`}>
                                    {movie.title} (
                                    {movie.release_date.slice(0, 4)})
                                </Link>
                            ),
                        };
                    })
                    .catch((error) => console.log(error))
            )
        )
            .then((data) =>
                setUniqueMovies(
                    data.filter(
                        (movie, index, array) =>
                            array.findIndex((mov) => mov.id === movie.id) ===
                            index
                    )
                )
            )
            .catch((error) => console.log(error));
    }, [user]);

    useEffect(() => {
        setMoviesSeenLinks(
            uniqueMovies
                .filter((movie) => moviesSeen.includes(`${movie.id}`))
                .map((movie, index, array) => {
                    return index === array.length - 1 ? (
                        movie.link
                    ) : (
                        <>{movie.link}, </>
                    );
                })
        );
        setMoviesToSeeLinks(
            uniqueMovies
                .filter((movie) => moviesToSee.includes(`${movie.id}`))
                .map((movie, index, array) => {
                    if (index === array.length - 1) {
                        return movie.link;
                    }
                })
        );
    }, [uniqueMovies, moviesSeen, moviesToSee]);

    return (
        <>
            <main>
                <h1>Tableau de bord</h1>
            </main>
            <nav>
                <ul>
                    <li>
                        <h2>À voir</h2>
                        <p>{moviesToSeeLinks}</p>
                    </li>
                    <li>
                        <h2>Déjà vus</h2>
                        <p>{moviesSeenLinks}</p>
                    </li>
                    <li>
                        <h2>J'aime</h2>
                    </li>
                    <li>
                        <h2>Mes critiques</h2>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Dashboard;
