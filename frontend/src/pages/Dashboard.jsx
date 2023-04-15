import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { setUserInfo } from "../utils/requests";
import { selectUserInfo } from "../utils/selectors";

const Dashboard = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);

    const user = useSelector(selectUserInfo());
    const [moviesSeen, setMoviesSeen] = useState([]);
    const [moviesLinks, setMoviesLinks] = useState([]);

    useEffect(() => {
        user.moviesSeen.forEach((id) => {
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
                .then((movie) =>
                    setMoviesSeen((moviesSeen) => [
                        ...moviesSeen,
                        {
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
                        },
                    ])
                )
                .catch((error) => console.log(error));
        });
    }, [user]);

    // Remove duplicates (for Strict mode)
    useEffect(() => {
        const uniqueMoviesSeen = moviesSeen.filter(
            (movie, index, array) =>
                array.findIndex((mov) => mov.id === movie.id) === index
        );
        setMoviesLinks(
            uniqueMoviesSeen.map((movie, index) => {
                if (index === uniqueMoviesSeen.length - 1) {
                    return movie.link;
                } else {
                    return <>{movie.link}, </>;
                }
            })
        );
    }, [moviesSeen]);

    return (
        <>
            <main>
                <h1>Tableau de bord</h1>
            </main>
            <nav>
                <ul>
                    <li>
                        <h2>À voir</h2>
                    </li>
                    <li>
                        <h2>Déjà vus</h2>
                        <p>{moviesLinks}</p>
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
