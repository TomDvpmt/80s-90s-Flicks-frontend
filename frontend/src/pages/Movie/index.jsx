import { useState, useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MovieBackdrop from "../../components/MovieBackdrop";
import MoviePoster from "../../components/MoviePoster";
import MovieHeading from "../../components/MovieHeading";
import MovieTagline from "../../components/MovieTagline";
import MovieCastAndCrew from "../../components/MovieCastAndCrew";
import MovieGenres from "../../components/MovieGenres";
import MovieOverview from "../../components/MovieOverview";
import MovieBudget from "../../components/MovieBudget";
import MovieRevenue from "../../components/MovieRevenue";
import MovieIMDBLink from "../../components/MovieIMDBLink";
import ToggleFavorite from "../../components/ToggleFavorite";
import ToggleMovieSeen from "../../components/ToggleMovieSeen";
import ToggleMovieToSee from "../../components/ToggleMovieToSee";
import ErrorMessage from "../../components/ErrorMessage";
import ErrorBoundary from "../../components/ErrorBoundary";

import {
    userAddToMoviesToSee,
    userRemoveFromMoviesToSee,
    userAddToMoviesSeen,
    userRemoveFromMoviesSeen,
} from "../../features/user";

import {
    selectUserId,
    selectUserIsSignedIn,
    selectUserLanguage,
    selectUserMoviesToSee,
    selectUserMoviesSeen,
} from "../../app/selectors";

import { updateUserMoviesInDB } from "../../utils/user";
import { isEmptyObject } from "../../utils/utils";

import { Box, FormGroup } from "@mui/material";
import theme from "../../assets/styles/theme";

const Movie = () => {
    const userId = useSelector(selectUserId());
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const language = useSelector(selectUserLanguage());
    const dispatch = useDispatch();

    const movieId = parseInt(useParams().id);
    const movieData = useLoaderData();
    const moviesToSee = useSelector(selectUserMoviesToSee());
    const moviesSeen = useSelector(selectUserMoviesSeen());

    const [movie, setMovie] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [langData, setLangData] = useState({});

    useEffect(() => {
        setLangData(theme.languages[language].pages.movie);
    }, [language]);

    useEffect(() => {
        setMovie({ ...movieData, releaseDate: movieData.release_date });
    }, [movieData]);

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
        <>
            {!isEmptyObject(movie) && movie.success !== false ? (
                <Box component="section">
                    <MovieBackdrop
                        path={movie.backdrop_path}
                        movieTitle={movie.title}
                    />
                    <Box>
                        {movie.poster_path !== "" &&
                            movie.poster_path !== null && (
                                <MoviePoster
                                    path={movie.poster_path}
                                    movieTitle={movie.title}
                                />
                            )}
                        <Box sx={{ padding: ".5rem" }}>
                            {isSignedIn && (
                                <>
                                    <ToggleFavorite movieId={movieId} />
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
                                </>
                            )}
                            <MovieHeading
                                title={movie.title}
                                originalTitle={movie.original_title}
                            />
                            <MovieTagline tagline={movie.tagline} />
                            <MovieCastAndCrew
                                movieId={movieId}
                                releaseDate={movie.releaseDate}
                            />
                            <Box sx={{ p: "3rem 4rem" }}>
                                <MovieGenres genres={movie.genres} />
                                <MovieOverview overview={movie.overview} />
                            </Box>
                            <MovieBudget
                                movieLangData={langData}
                                budget={movie.budget}
                            />
                            <MovieRevenue
                                movieLangData={langData}
                                revenue={movie.revenue}
                            />
                            <MovieIMDBLink
                                imdbId={movie.imdb_id}
                                imdbLang={langData.imdbLink}
                            />
                        </Box>
                    </Box>
                </Box>
            ) : (
                <ErrorBoundary page="movie" />
            )}
            <ErrorMessage errorMessage={errorMessage} />
        </>
    );
};

export default Movie;
