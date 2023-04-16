import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ErrorMessage from "../../components/ErrorMessage";

import { API_URI } from "../../utils/config";
import {
    getMovieData,
    setCastAndCrew,
    setUserInfo,
} from "../../utils/requests";
import displayBigNumber from "../../utils/bigNumbers";

import store from "../../services/utils/store";
import {
    selectUserIsSignedIn,
    selectUserId,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
    selectUserLanguage,
    selectTmdbImagesSecureUrl,
} from "../../services/utils/selectors";
import { filtersAddActiveGenre } from "../../services/features/filters";
import {
    userAddToMoviesSeen,
    userRemoveFromMoviesSeen,
    userAddToMoviesToSee,
    userRemoveFromMoviesToSee,
} from "../../services/features/user";

import { Typography } from "@mui/material";

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
    const isSignedIn = useSelector(selectUserIsSignedIn());

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
    const moviesToSee = useSelector(selectUserMoviesToSee());
    const userHasSeenMovie = moviesSeen.includes(id);
    const userWantsToSeeMovie = moviesToSee.includes(id);

    const userId = useSelector(selectUserId());
    const language = useSelector(selectUserLanguage());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());

    const fetchURI = `${API_URI}users/${userId}`;
    const fetchParams = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Authorization: `BEARER ${token}`,
        },
    };

    const addToMoviesSeen = () => {
        store.dispatch(userAddToMoviesSeen(id));
        try {
            fetch(fetchURI, {
                ...fetchParams,
                body: JSON.stringify({ moviesSeen: [...moviesSeen, id] }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromMoviesSeen = () => {
        store.dispatch(userRemoveFromMoviesSeen(id));
        try {
            fetch(fetchURI, {
                ...fetchParams,
                body: JSON.stringify({
                    moviesSeen: moviesSeen.filter((movieId) => movieId !== id),
                }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addToMoviesToSee = () => {
        store.dispatch(userAddToMoviesToSee(id));
        try {
            fetch(fetchURI, {
                ...fetchParams,
                body: JSON.stringify({ moviesToSee: [...moviesToSee, id] }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromMoviesToSee = () => {
        store.dispatch(userRemoveFromMoviesToSee(id));
        try {
            fetch(fetchURI, {
                ...fetchParams,
                body: JSON.stringify({
                    moviesToSee: moviesToSee.filter(
                        (movieId) => movieId !== id
                    ),
                }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleMovieSeen = () => {
        if (userHasSeenMovie) {
            removeFromMoviesSeen();
        } else {
            addToMoviesSeen();
            userWantsToSeeMovie && removeFromMoviesToSee();
        }
    };

    const handleMovieToSee = () => {
        if (userWantsToSeeMovie) {
            removeFromMoviesToSee();
        } else {
            addToMoviesToSee();
            userHasSeenMovie && removeFromMoviesSeen();
        }
    };

    const handleGenreClick = (e) => {
        store.dispatch(filtersAddActiveGenre(parseInt(e.target.id)));
    };

    useEffect(() => {
        getMovieData(id, language)
            .then((data) => {
                setMovie(data);
            })
            .catch((error) => {
                setErrorMessage(
                    "Impossible d'afficher les informations du film."
                );
                console.error(error);
            });
    }, [id, language]);

    useEffect(() => {
        setCastAndCrew("movie", id, setDirector, setActors);
    }, [actors.length, id]);

    return (
        <StyledMovie>
            <section className="movie">
                {movie.backdrop_path && (
                    <img
                        className="backdrop"
                        src={`${imageBaseUrl}${"original"}${
                            movie.backdrop_path
                        }`}
                        alt={movie.title + "(backdrop)"}
                    />
                )}
                <div className="details">
                    {movie.poster_path && (
                        <img
                            className="poster"
                            src={`${imageBaseUrl}w500${movie.poster_path}`}
                            alt={movie.title + "(poster)"}
                        />
                    )}
                    <div className="info">
                        <Typography component="h1" variant="h1">
                            {movie.title}
                        </Typography>
                        <p>({movie.original_title})</p>
                        <p>{movie.tagline}</p>
                        <p>
                            {director}
                            {director && movie.release_date && " | "}
                            {movie.release_date &&
                                movie.release_date.slice(0, 4)}
                        </p>
                        <p>{actors}</p>
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
                            Revenue :{" "}
                            {!movie.revenue || movie.revenue === 0
                                ? "non-disponible"
                                : "$ " + displayBigNumber(movie.revenue)}
                        </p>

                        <Link
                            to={`https://www.imdb.com/title/${movie.imdb_id}/`}
                            target="_blank">
                            See on IMDB
                        </Link>
                        <br />
                        {isSignedIn && (
                            <>
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
                                <br />
                                <label htmlFor="movieToSee">
                                    I want to see this movie !
                                </label>
                                <input
                                    type="checkbox"
                                    name="movieToSee"
                                    id="movieToSee"
                                    checked={userWantsToSeeMovie}
                                    onChange={handleMovieToSee}
                                />
                            </>
                        )}
                    </div>
                </div>
            </section>
            <ErrorMessage errorMessage={errorMessage} />
        </StyledMovie>
    );
};

export default Movie;
