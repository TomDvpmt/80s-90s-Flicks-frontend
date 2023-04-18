import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ErrorMessage from "../../components/ErrorMessage";

import { API_URI } from "../../utils/config";
import { getMovieData, setCastAndCrew } from "../../utils/requests";
import displayBigNumber from "../../utils/bigNumbers";

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

import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import theme from "../../assets/styles/theme";

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
        object-fit: scale-down;
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
        object-fit: scale-down;
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
    const dispatch = useDispatch();

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

    const [langData, setLangData] = useState({});

    const addToMoviesSeen = () => {
        dispatch(userAddToMoviesSeen(id));
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
        dispatch(userRemoveFromMoviesSeen(id));
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
        dispatch(userAddToMoviesToSee(id));
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
        dispatch(userRemoveFromMoviesToSee(id));
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
        dispatch(filtersAddActiveGenre(parseInt(e.target.id)));
    };

    useEffect(() => {
        setLangData(theme.languages[language].pages.movie);
    }, [language]);

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
        <Box component="main">
            <Box component="section">
                <Box
                    maxWidth="100%"
                    sx={{ display: { xs: "none", sm: "block" } }}>
                    {movie.backdrop_path && (
                        <img
                            src={`${imageBaseUrl}${"original"}${
                                movie.backdrop_path
                            }`}
                            alt={movie.title + "(backdrop)"}
                            width="100%"
                        />
                    )}
                </Box>
                <Box>
                    {movie.poster_path && (
                        <img
                            src={`${imageBaseUrl}w500${movie.poster_path}`}
                            alt={movie.title + "(poster)"}
                            width="100%"
                        />
                    )}
                    <Box sx={{ padding: ".5rem" }}>
                        <Typography
                            component="h1"
                            variant="h1"
                            align="center"
                            sx={{ ffontWeight: "700" }}>
                            {movie.title}
                        </Typography>
                        <Typography
                            paragraph
                            align="center"
                            sx={{ fontStyle: "italic" }}>
                            {movie.title !== movie.original_title &&
                                `(${movie.original_title})`}
                        </Typography>
                        {movie.tagline && (
                            <Typography paragraph fontWeight="700">
                                {movie.tagline}
                            </Typography>
                        )}
                        <Typography paragraph>
                            {director}
                            {director && movie.release_date && " | "}
                            {movie.release_date &&
                                movie.release_date.slice(0, 4)}
                        </Typography>
                        <Typography paragraph>{actors}</Typography>
                        {movie.genres && (
                            <Box>
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
                            </Box>
                        )}
                        <Typography paragraph>{movie.overview}</Typography>
                        <Typography paragraph>
                            {langData.budget}{" "}
                            {!movie.budget || movie.budget === 0
                                ? "non-disponible"
                                : "$ " + displayBigNumber(movie.budget)}
                        </Typography>

                        <Typography paragraph>
                            {langData.revenue}{" "}
                            {!movie.revenue || movie.revenue === 0
                                ? "non-disponible"
                                : "$ " + displayBigNumber(movie.revenue)}
                        </Typography>

                        <Link
                            to={`https://www.imdb.com/title/${movie.imdb_id}/`}
                            target="_blank">
                            {langData.imdbLink}
                        </Link>
                        <br />
                        {isSignedIn && (
                            <Box component="form">
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={userHasSeenMovie}
                                                onChange={handleMovieSeen}
                                            />
                                        }
                                        label={langData.seen}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={userWantsToSeeMovie}
                                                onChange={handleMovieToSee}
                                            />
                                        }
                                        label={langData.toSee}
                                    />
                                </FormGroup>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <ErrorMessage errorMessage={errorMessage} />
        </Box>
    );
};

export default Movie;
