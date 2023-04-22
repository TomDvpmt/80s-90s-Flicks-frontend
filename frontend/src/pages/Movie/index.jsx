import { useState, useEffect } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AddToFavorites from "../../components/AddToFavorites";
import ErrorMessage from "../../components/ErrorMessage";

import { setCastAndCrew } from "../../utils/movie";
import displayBigNumber from "../../utils/bigNumbers";

import {
    selectUserIsSignedIn,
    selectUserId,
    selectUserMoviesToSee,
    selectUserMoviesSeen,
    selectUserFavorites,
    selectUserLanguage,
    selectTmdbImagesSecureUrl,
} from "../../services/utils/selectors";
import { filtersAddActiveGenre } from "../../services/features/filters";
import {
    userAddToMoviesSeen,
    userRemoveFromMoviesSeen,
    userAddToMoviesToSee,
    userRemoveFromMoviesToSee,
    userAddToFavorites,
    userRemoveFromFavorites,
} from "../../services/features/user";

import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import theme from "../../assets/styles/theme";

const Movie = () => {
    const token = sessionStorage.getItem("token");
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const dispatch = useDispatch();

    const [movie, setMovie] = useState({});
    const [director, setDirector] = useState("");
    const [actors, setActors] = useState([""]);
    const [errorMessage, setErrorMessage] = useState("");

    const movieData = useLoaderData();

    const movieId = useParams().id;
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const moviesToSee = useSelector(selectUserMoviesToSee());
    const userHasSeenMovie = moviesSeen.includes(movieId);
    const userWantsToSeeMovie = moviesToSee.includes(movieId);

    const userId = useSelector(selectUserId());
    const language = useSelector(selectUserLanguage());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());

    const fetchURI = `/API/users/${userId}`;
    const fetchParams = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Authorization: `BEARER ${token}`,
        },
    };

    const [langData, setLangData] = useState({});

    const addToMoviesSeen = () => {
        dispatch(userAddToMoviesSeen(movieId));
        try {
            fetch(fetchURI, {
                ...fetchParams,
                body: JSON.stringify({ moviesSeen: [...moviesSeen, movieId] }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromMoviesSeen = () => {
        dispatch(userRemoveFromMoviesSeen(movieId));
        try {
            fetch(fetchURI, {
                ...fetchParams,
                body: JSON.stringify({
                    moviesSeen: moviesSeen.filter((id) => id !== movieId),
                }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addToMoviesToSee = () => {
        dispatch(userAddToMoviesToSee(movieId));
        try {
            fetch(fetchURI, {
                ...fetchParams,
                body: JSON.stringify({
                    moviesToSee: [...moviesToSee, movieId],
                }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromMoviesToSee = () => {
        dispatch(userRemoveFromMoviesToSee(movieId));
        try {
            fetch(fetchURI, {
                ...fetchParams,
                body: JSON.stringify({
                    moviesToSee: moviesToSee.filter((id) => id !== movieId),
                }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    // const addToFavorites = () => {
    //     dispatch(userAddToFavorites(movieId));
    //     try {
    //         fetch(fetchURI, {
    //             ...fetchParams,
    //             body: JSON.stringify({
    //                 favorites: [...favorites, movieId],
    //             }),
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const removeFromFavorites = () => {
    //     dispatch(userRemoveFromFavorites(movieId));
    //     try {
    //         fetch(fetchURI, {
    //             ...fetchParams,
    //             body: JSON.stringify({
    //                 favorites: favorites.filter((id) => id !== movieId),
    //             }),
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleMovieSeenCheckbox = () => {
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
                        <AddToFavorites
                            movieId={movieId}
                            fetchURI={fetchURI}
                            fetchParams={fetchParams}
                        />
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
                                                checked={userWantsToSeeMovie}
                                                onChange={handleMovieToSee}
                                            />
                                        }
                                        label={langData.toSee}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={userHasSeenMovie}
                                                onChange={
                                                    handleMovieSeenCheckbox
                                                }
                                            />
                                        }
                                        label={langData.seen}
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
