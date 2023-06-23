import { useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MovieCard from "../../components/MovieCard";
import MovieCardsGrid from "../../components/MovieCardsGrid";
import HomeFilters from "../../components/filters/HomeFilters";
import Pagination from "../../components/Pagination";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loader from "../../components/Loader";

import { selectUserToken } from "../../features/userSlice";
import {
    selectFiltersAll,
    selectFiltersActiveGenres,
    selectFiltersYear,
} from "../../features/filtersSlice";
import {
    setShowLoggedOnlyDialog,
    setShowSearchMovieDialog,
} from "../../features/dialogsSlice";

import { TMDB_API_KEY, TMDB_BASE_URI } from "../../config/APIs";

import theme from "../../styles/theme";

import { Box, Paper, Typography, Button } from "@mui/material";

const ACTIONS = {
    setIsYearFilterReady: "setIsYearFilterReady",
    setIsGenreFilterReady: "setIsGenreFilterReady",
    setHasActiveFilters: "setHasActiveFilters",
    setNumberOfPages: "setNumberOfPages",
    setNumberOfResults: "setNumberOfResults",
    setMovies: "setMovies",
    setCurrentPage: "setCurrentPage",
    setLoading: "setLoading",
    setHasError: "setHasError",
};

const Home = () => {
    const token = useSelector(selectUserToken);
    const filters = useSelector(selectFiltersAll);
    const activeGenres = useSelector(selectFiltersActiveGenres);
    const activeYear = useSelector(selectFiltersYear);

    const dispatch = useDispatch();

    const reducer = (state, { type, payload }) => {
        switch (type) {
            case "setIsYearFilterReady":
                return { ...state, isYearFilterReady: payload };
            case "setIsGenreFilterReady":
                return { ...state, isGenreFilterReady: payload };
            case "setHasActiveFilters":
                return { ...state, hasActiveFilters: payload };
            case "setNumberOfPages":
                return { ...state, numberOfPages: payload };
            case "setNumberOfResults":
                return { ...state, numberOfResults: payload };
            case "setMovies":
                return { ...state, movies: payload };
            case "setCurrentPage":
                return { ...state, currentPage: payload };
            case "setLoading":
                return { ...state, loading: payload };
            case "setHasError":
                return { ...state, hasError: payload };
            default:
                throw new Error("Reducer: unknown action.");
        }
    };

    const [state, localDispatch] = useReducer(reducer, {
        isYearFilterReady: false,
        isGenreFilterReady: false,
        hasActiveFilters: false,
        numberOfPages: 1,
        numberOfResults: 0,
        movies: [],
        currentPage: 1,
        loading: true,
        hasError: false,
    });

    useEffect(() => {
        localDispatch({
            type: ACTIONS.setHasActiveFilters,
            payload:
                activeGenres.length === 0 && activeYear === "1980-1999"
                    ? false
                    : true,
        });
    }, [activeGenres, activeYear]);

    useEffect(() => {}, [state.hasActiveFilters]);

    const handleSearch = () => {
        token
            ? dispatch(setShowSearchMovieDialog(true))
            : dispatch(setShowLoggedOnlyDialog(true));
    };

    // get movies
    useEffect(() => {
        localDispatch({ type: ACTIONS.setLoading, payload: true });

        const queryFilters = filters
            .filter((filter) => filter.value !== "")
            .map((filter) => filter.param + filter.value)
            .join("");

        fetch(
            `${TMDB_BASE_URI}/discover/movie?api_key=${TMDB_API_KEY}${queryFilters}`
        )
            .then((response) => response.json())
            .then((data) => {
                localDispatch({
                    type: ACTIONS.setNumberOfPages,
                    payload: data.total_pages > 500 ? 500 : data.total_pages,
                });
                localDispatch({
                    type: ACTIONS.setNumberOfResults,
                    payload: data.total_results,
                });

                const results = data.results.map((movie) => {
                    const movieData = {
                        id: movie.id,
                        imdbId: movie.imdb_id,
                        title: movie.title,
                        originalTitle: movie.original_title || "",
                        tagline: movie.tagline || "",
                        genres: movie.genres,
                        overview: movie.overview || "",
                        backdropPath: movie.backdrop_path,
                        posterPath: movie.poster_path,
                        releaseDate: movie.release_date || "",
                        voteAverage: movie.vote_average,
                        budget: movie.budget,
                        revenue: movie.revenue,
                    };
                    return (
                        <MovieCard
                            key={movie.id}
                            page="home"
                            movie={movieData}
                        />
                    );
                });
                localDispatch({ type: ACTIONS.setMovies, payload: results });
            })
            .catch((error) => {
                localDispatch({ type: ACTIONS.setHasError, payload: true });
                console.error(error);
            })
            .finally(() => {
                localDispatch({ type: ACTIONS.setLoading, payload: false });
            });
    }, [filters]);

    return (
        <>
            <Box
                component="section"
                width="100%"
                maxWidth={theme.maxWidth.filters}
                margin="auto">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{ color: "white" }}>
                        Recherche par titre
                    </Button>
                </Box>
                <Outlet />
                <HomeFilters reducer={{ ACTIONS, state, localDispatch }} />
                <Paper
                    elevation={2}
                    sx={{
                        margin: "2rem 0",
                        padding: "1rem",
                    }}>
                    <Typography>
                        Nombre de résultats: {state.numberOfResults}{" "}
                        {state.numberOfResults > 10000 && (
                            <span>(10 000 max. disponibles)</span>
                        )}
                    </Typography>
                </Paper>
                {state.movies?.length > 0 && (
                    <Pagination reducer={{ ACTIONS, state, localDispatch }} />
                )}
            </Box>
            <Box component="section">
                {state.loading ? (
                    <Loader />
                ) : state.hasError ? (
                    <ErrorBoundary page="home" />
                ) : (
                    <MovieCardsGrid movies={state.movies} />
                )}
            </Box>
            {state.movies?.length > 0 && (
                <Pagination reducer={{ ACTIONS, state, localDispatch }} />
            )}
        </>
    );
};

export default Home;
