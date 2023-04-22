import { useState, useEffect } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AddToFavorites from "../../components/AddToFavorites";
import ToggleMovieSeenOrToSee from "../../components/ToggleMovieSeenOrToSee";
import ErrorMessage from "../../components/ErrorMessage";

import { setCastAndCrew } from "../../utils/movie";
import displayBigNumber from "../../utils/bigNumbers";

import {
    selectUserIsSignedIn,
    selectUserLanguage,
    selectTmdbImagesSecureUrl,
} from "../../services/utils/selectors";
import { filtersAddActiveGenre } from "../../services/features/filters";

import { Box, Typography } from "@mui/material";
import theme from "../../assets/styles/theme";

const Movie = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const dispatch = useDispatch();

    const [movie, setMovie] = useState({});
    const [director, setDirector] = useState("");
    const [actors, setActors] = useState([""]);
    const [errorMessage, setErrorMessage] = useState("");

    const movieData = useLoaderData();

    const movieId = parseInt(useParams().id);

    const language = useSelector(selectUserLanguage());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());

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
                        {isSignedIn && <AddToFavorites movieId={movieId} />}
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
                                <ToggleMovieSeenOrToSee movieId={movieId} />
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
