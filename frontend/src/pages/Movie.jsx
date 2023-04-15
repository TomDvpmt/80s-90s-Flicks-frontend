import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ErrorMessage from "../components/ErrorMessage";

import { fetchData, setCastAndCrew, setUserInfo } from "../utils/requests";
import displayBigNumber from "../utils/bigNumbers";

import store from "../utils/store";
import { filtersAddActiveGenre } from "../features/filters";
import {
    userAddToMoviesSeen,
    userRemoveFromMoviesSeen,
} from "../features/user";
import { selectUserMoviesSeen, selectUserId } from "../utils/selectors";

import styled from "styled-components";

const StyledMovie = styled.main`
    background-color: black;

    .movie {
        display: grid;
        align-items: center;
        color: white;
    }

    .backdrop {
        grid-row: 1;
        grid-column: 1;
        display: block;
        max-width: 100%;
        opacity: 0.2;
    }

    .details {
        grid-row: 1;
        grid-column: 1;
        max-width: 1280px;
        margin: auto;
        display: flex;
        flex-direction: column;
        z-index: 99;
    }

    .poster {
        object-fit: contain;
        max-width: 500px;
    }

    .info {
        padding: 3rem;

        h1,
        p,
        label {
            color: white;
        }
    }

    h1 {
        margin: 2rem 0 1rem 0;
    }
`;

const Movie = () => {
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        setUserInfo(token);
        // to add : handle request error
    }, [token]);

    const [movie, setMovie] = useState({});
    const [director, setDirector] = useState("");
    const [actors, setActors] = useState([""]);
    const [errorMessage, setErrorMessage] = useState("");

    const id = useParams().id;
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const userHasSeenMovie = moviesSeen.includes(id);

    const userId = useSelector(selectUserId());

    const handleMovieSeen = () => {
        if (userHasSeenMovie) {
            store.dispatch(userRemoveFromMoviesSeen(id));
            try {
                fetch(`${process.env.REACT_APP_API_URI}users/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `BEARER ${token}`,
                    },
                    body: JSON.stringify({
                        moviesSeen: moviesSeen.filter(
                            (movieId) => movieId !== id
                        ),
                    }),
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            store.dispatch(userAddToMoviesSeen(id));
            try {
                fetch(`${process.env.REACT_APP_API_URI}users/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `BEARER ${token}`,
                    },
                    body: JSON.stringify({ moviesSeen: [...moviesSeen, id] }),
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleGenreClick = (e) => {
        store.dispatch(filtersAddActiveGenre(parseInt(e.target.id)));
    };

    useEffect(() => {
        fetchData(
            `https://api.themoviedb.org/3/movie/${id}?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=fr`,
            {
                method: "GET",
            }
        )
            .then((data) => {
                setMovie(data);
            })
            .catch((error) => {
                setErrorMessage(
                    "Impossible d'afficher les informations du film."
                );
                console.error(error);
            });
    }, [id]);

    useEffect(() => {
        setCastAndCrew("movie", id, setDirector, setActors);
    }, [actors.length, id]);

    return (
        <StyledMovie>
            <section className="movie">
                <img
                    className="backdrop"
                    src={
                        "https://image.tmdb.org/t/p/original" +
                        movie.backdrop_path
                    }
                    alt={movie.title + "(backdrop)"}
                />
                <div className="details">
                    <img
                        className="poster"
                        src={
                            "https://image.tmdb.org/t/p/w500" +
                            movie.poster_path
                        }
                        alt={movie.title + "(poster)"}
                    />
                    <div className="info">
                        <h1>{movie.title}</h1>
                        <p>({movie.original_title})</p>
                        <p>{movie.tagline}</p>
                        <p>
                            {director}
                            {director && movie.release_date && " | "}
                            {movie.release_date &&
                                movie.release_date.slice(0, 4)}
                        </p>
                        <p>{actors}</p>
                        <p></p>
                        {movie.genres && (
                            <ul>
                                {movie.genres.map((genre, index) => (
                                    <Link
                                        key={index}
                                        id={genre.id}
                                        to="/"
                                        onClick={handleGenreClick}
                                        state={{
                                            param: "&with_genres=",
                                            value: genre.id,
                                        }}>
                                        {genre.name}
                                        {index === movie.genres.length - 1
                                            ? ""
                                            : ", "}
                                    </Link>
                                ))}
                            </ul>
                        )}
                        <p>{movie.overview}</p>
                        <p>
                            Budget :{" "}
                            {!movie.budget || movie.budget === 0
                                ? "non-disponible"
                                : "$ " + displayBigNumber(movie.budget)}
                        </p>

                        <p>
                            Recettes :{" "}
                            {!movie.revenue || movie.revenue === 0
                                ? "non-disponible"
                                : "$ " + displayBigNumber(movie.revenue)}
                        </p>

                        <Link
                            to={`https://www.imdb.com/title/${movie.imdb_id}/`}
                            target="_blank">
                            Voir sur IMDB
                        </Link>
                        <br />
                        <label htmlFor="movieSeen">
                            I've seen this movie !
                        </label>
                        <input
                            type="checkbox"
                            name="movieSeen"
                            id="movieSeen"
                            checked={userHasSeenMovie}
                            onChange={handleMovieSeen}
                        />
                    </div>
                </div>
            </section>
            <ErrorMessage errorMessage={errorMessage} />
        </StyledMovie>
    );
};

export default Movie;
