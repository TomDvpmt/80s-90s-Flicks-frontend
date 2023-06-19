import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import MovieBackdrop from "../../components/MovieBackdrop";
import MoviePoster from "../../components/MoviePoster";
import MovieCheckboxes from "../../components/MovieCheckboxes";
import MovieHeading from "../../components/MovieHeading";
import MovieTagline from "../../components/MovieTagline";
import MovieCastAndCrew from "../../components/MovieCastAndCrew";
import MovieGenres from "../../components/MovieGenres";
import MovieOverview from "../../components/MovieOverview";
import MovieBudget from "../../components/MovieBudget";
import MovieRevenue from "../../components/MovieRevenue";
import MovieIMDBLink from "../../components/MovieIMDBLink";
import MovieWikiLink from "../../components/MovieWikiLink";
import Loader from "../../components/Loader";
import ErrorBoundary from "../../components/ErrorBoundary";

import {
    selectUserIsSignedIn,
    selectUserLanguage,
} from "../../features/userSlice";

import { getMovieData } from "../../utils/movie";
import { isEmptyObject } from "../../utils/helpers";

import { Box, ButtonGroup } from "@mui/material";
import theme from "../../styles/theme";

const ACTIONS = {
    setLangData: "setLangData",
    setMovie: "setMovie",
    setIsLoading: "setIsLoading",
    setHasError: "setHasError",
};

const Movie = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn);
    const language = useSelector(selectUserLanguage);

    const { id } = useParams();
    const movieId = parseInt(id);

    const reducer = (state, { type, payload }) => {
        switch (type) {
            case "setLangData":
                return { ...state, langData: payload };
            case "setMovie":
                return { ...state, movie: payload };
            case "setIsLoading":
                return { ...state, isLoading: payload };
            case "setHasError":
                return { ...state, hasError: payload };
            default:
                throw new Error("Reducer: unknown action.");
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        langData: {},
        movie: {},
        isLoading: true,
        hasError: false,
    });

    useEffect(() => {
        dispatch({
            type: ACTIONS.setLangData,
            payload: theme.languages[language].pages.movie,
        });
    }, [language]);

    useEffect(() => {
        dispatch({ type: ACTIONS.setIsLoading, payload: true });
        getMovieData(movieId, language)
            .then((movieData) =>
                dispatch({
                    type: ACTIONS.setMovie,
                    payload: {
                        ...movieData,
                        releaseDate: movieData.release_date,
                    },
                })
            )
            .catch((error) => {
                console.error(error);
                dispatch({ type: ACTIONS.setHasError, payload: true });
            })
            .finally(() =>
                dispatch({ type: ACTIONS.setIsLoading, payload: false })
            );
    }, [movieId, language]);

    return state.isLoading ? (
        <Box>
            <Loader />
        </Box>
    ) : state.hasError ? (
        <ErrorBoundary page="movie" />
    ) : (
        <>
            {!isEmptyObject(state.movie) && state.movie.success !== false ? (
                <Box
                    component="section"
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        display: "grid",
                        justifyItems: "center",
                        alignItems: "start",
                        color: { md: theme.palette.text.darkBg },
                        "& a": {
                            color: { md: theme.palette.text.darkBg },
                        },
                    }}>
                    <MovieBackdrop
                        path={state.movie.backdrop_path}
                        movieTitle={state.movie.title}
                    />
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: theme.maxWidth.main,
                            gridColumn: "1",
                            gridRow: "1",
                            zIndex: "2",
                            p: { xs: "0 0 3rem", md: "3rem 0 3rem" },
                            display: { md: "grid" },
                            gridTemplateColumns: "1fr 1fr",
                            columnGap: "2rem",
                            alignItems: "center",
                        }}>
                        <MoviePoster
                            path={state.movie.poster_path}
                            movieTitle={state.movie.title}
                        />
                        {isSignedIn && (
                            <MovieCheckboxes
                                movieId={movieId}
                                langData={state.langData}
                            />
                        )}
                        <Box
                            sx={{
                                gridColumn: "2",
                                gridRow: "1",
                                padding: ".5rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}>
                            <MovieHeading
                                title={state.movie.title}
                                originalTitle={state.movie.original_title}
                            />
                            <MovieTagline tagline={state.movie.tagline} />
                            <MovieCastAndCrew
                                movieId={movieId}
                                releaseDate={state.movie.releaseDate}
                            />
                            <Box sx={{ p: "2rem" }}>
                                <MovieGenres
                                    // exclude Documentary (99) and Television film (10770)
                                    genres={state.movie.genres?.filter(
                                        (genre) =>
                                            genre.id !== 99 &&
                                            genre.id !== 10770
                                    )}
                                />
                                <MovieOverview
                                    overview={state.movie.overview}
                                />
                            </Box>
                            <MovieBudget
                                movieLangData={state.langData}
                                budget={state.movie.budget}
                            />
                            <MovieRevenue
                                movieLangData={state.langData}
                                revenue={state.movie.revenue}
                            />
                        </Box>
                        <Box
                            sx={{
                                mt: "1rem",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            <ButtonGroup variant="outlined">
                                <MovieIMDBLink
                                    imdbId={state.movie.imdb_id}
                                    imdbLang={state.langData.imdbLink}
                                />
                                <MovieWikiLink movieTitle={state.movie.title} />
                            </ButtonGroup>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <ErrorBoundary page="movie" />
            )}
        </>
    );
};

export default Movie;
