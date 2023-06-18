import { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import MovieCard from "../../components/MovieCard";
import MovieCardsGrid from "../../components/MovieCardsGrid";
import YearFilter from "../../components/filters/YearFilter";
import GenresFilter from "../../components/filters/GenresFilter";
import SearchMovieDialog from "../../components/SearchMovieDialog";
// import Language from "../../components/Language";
import Pagination from "../../components/Pagination";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loader from "../../components/Loader";

import { filtersClearAll } from "../../features/filters";
import { selectFiltersAll } from "../../app/selectors";

import { TMDB_API_KEY } from "../../utils/config";

import theme from "../../assets/styles/theme";

import { Box, Paper, Typography, Button } from "@mui/material";

const ACTIONS = {
    setNumberOfPages: "setNumberOfPages",
    setNumberOfResults: "setNumberOfResults",
    setMovies: "setMovies",
    setLoading: "setLoading",
    setHasError: "setHasError",
};

const Home = () => {
    const filters = useSelector(selectFiltersAll());
    const dispatch = useDispatch();

    const reducer = (state, { type, payload }) => {
        switch (type) {
            case "setNumberOfPages":
                return { ...state, numberOfPages: payload };
            case "setNumberOfResults":
                return { ...state, numberOfResults: payload };
            case "setMovies":
                return { ...state, movies: payload };
            case "setLoading":
                return { ...state, loading: payload };
            case "setHasError":
                return { ...state, hasError: payload };
            default:
                throw new Error("Reducer: unknown action.");
        }
    };

    const [state, reducerDispatch] = useReducer(reducer, {
        numberOfPages: 1,
        numberOfResults: 0,
        movies: [],
        loading: true,
        hasError: false,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [showSearchMovieDialog, setShowSearchMovieDialog] = useState(false);

    const handleFiltersClearAll = () => {
        dispatch(filtersClearAll());
    };

    useEffect(() => {
        reducerDispatch({ type: ACTIONS.setLoading, payload: true });

        const queryFilters = filters
            .filter((filter) => filter.value !== "")
            .map((filter) => filter.param + filter.value)
            .join("");

        fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}${queryFilters}`
        )
            .then((response) => response.json())
            .then((data) => {
                reducerDispatch({
                    type: ACTIONS.setNumberOfPages,
                    payload: data.total_pages > 500 ? 500 : data.total_pages,
                });
                reducerDispatch({
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
                reducerDispatch({ type: ACTIONS.setMovies, payload: results });
            })
            .catch((error) => {
                reducerDispatch({ type: ACTIONS.setHasError, payload: true });
                console.error(error);
            })
            .finally(() => {
                reducerDispatch({ type: ACTIONS.setLoading, payload: false });
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
                        onClick={() => setShowSearchMovieDialog(true)}
                        sx={{ color: "white" }}>
                        Recherche par titre
                    </Button>
                    <SearchMovieDialog
                        showSearchMovieDialog={showSearchMovieDialog}
                        setShowSearchMovieDialog={setShowSearchMovieDialog}
                    />
                </Box>
                <Paper
                    elevation={2}
                    sx={{
                        margin: "2rem 0",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}>
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "1rem",
                                "& *": { flex: "1" },
                            }}>
                            <YearFilter setCurrentPage={setCurrentPage} />
                            <GenresFilter />
                        </Box>
                        <Button
                            variant="outlined"
                            onClick={handleFiltersClearAll}
                            sx={{
                                maxWidth: "max-content",
                                margin: "auto",
                            }}>
                            Aucun filtre
                        </Button>
                    </Box>
                </Paper>
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
                {/* <Language /> */}
                {state.movies?.length > 0 && (
                    <Pagination
                        numberOfPages={state.numberOfPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </Box>
            <Box component="section">
                {state.loading ? (
                    <Loader />
                ) : state.hasError ? (
                    <ErrorBoundary page="home" />
                ) : (
                    <>
                        <MovieCardsGrid movies={state.movies} />
                    </>
                )}
            </Box>
            {state.movies?.length > 0 && (
                <Pagination
                    numberOfPages={state.numberOfPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </>
    );
};

export default Home;
