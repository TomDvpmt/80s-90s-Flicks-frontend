import { useState, useEffect } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ToggleFavorite from "../../components/ToggleFavorite";
import ToggleMovieSeen from "../../components/ToggleMovieSeen";
import ToggleMovieToSee from "../../components/ToggleMovieToSee";
import ErrorMessage from "../../components/ErrorMessage";

import {
    userAddToMoviesToSee,
    userRemoveFromMoviesToSee,
    userAddToMoviesSeen,
    userRemoveFromMoviesSeen,
} from "../../services/features/user";
import { filtersAddActiveGenre } from "../../services/features/filters";

import {
    selectUserId,
    selectUserIsSignedIn,
    selectUserLanguage,
    selectUserMoviesToSee,
    selectUserMoviesSeen,
    selectTmdbImagesSecureUrl,
} from "../../services/utils/selectors";

import { updateUserMoviesInDB } from "../../utils/user";
import { setCastAndCrew } from "../../utils/movie";
import displayBigNumber from "../../utils/bigNumbers";

import { Box, Typography, FormGroup } from "@mui/material";
import theme from "../../assets/styles/theme";

const Movie = () => {
    const userId = useSelector(selectUserId());
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const language = useSelector(selectUserLanguage());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());
    const dispatch = useDispatch();

    const movieId = parseInt(useParams().id);
    const movieData = useLoaderData();
    const moviesToSee = useSelector(selectUserMoviesToSee());
    const moviesSeen = useSelector(selectUserMoviesSeen());

    const [movie, setMovie] = useState({});
    const [director, setDirector] = useState("");
    const [actors, setActors] = useState([""]);
    const [errorMessage, setErrorMessage] = useState("");
    const [langData, setLangData] = useState({});

    const handleGenreClick = (e) => {
        dispatch(filtersAddActiveGenre(parseInt(e.target.id)));
    };

    useEffect(() => {
        setLangData(theme.languages[language].pages.movie);
    }, [language]);

    useEffect(() => {
        setMovie(movieData);
    }, [movieData]);

    useEffect(() => {
        setCastAndCrew("movie", movieId, setDirector, setActors);
    }, [actors.length, movieId]);

    const toggleMovieInUserMovies = (action) => {
        let bodyObject = {};
        switch (action) {
            case userAddToMoviesToSee:
                bodyObject = { moviesToSee: [...moviesToSee, movieId] };
                break;
            case userRemoveFromMoviesToSee:
                bodyObject = {
                    moviesToSee: moviesToSee.filter((id) => id !== movieId),
                };
                break;
            case userAddToMoviesSeen:
                bodyObject = { moviesSeen: [...moviesSeen, movieId] };
                break;
            case userRemoveFromMoviesSeen:
                bodyObject = {
                    moviesSeen: moviesSeen.filter((id) => id !== movieId),
                };
                break;
            default:
                bodyObject = {};
        }

        dispatch(action(movieId));
        try {
            updateUserMoviesInDB(userId, bodyObject);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box component="main">
            <Box component="section">
                <Box
                    maxWidth="100%"
                    sx={{ display: { xs: "none", md: "block" } }}>
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
                        {isSignedIn && <ToggleFavorite movieId={movieId} />}
                        <Typography
                            component="h1"
                            variant="h1"
                            align="center"
                            sx={{ fontWeight: "700" }}>
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
                                    <ToggleMovieSeen
                                        movieId={movieId}
                                        langData={langData}
                                        toggleMovieInUserMovies={
                                            toggleMovieInUserMovies
                                        }
                                    />
                                    <ToggleMovieToSee
                                        movieId={movieId}
                                        langData={langData}
                                        toggleMovieInUserMovies={
                                            toggleMovieInUserMovies
                                        }
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
