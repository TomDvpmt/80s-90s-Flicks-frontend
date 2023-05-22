import { useState, useEffect } from "react";
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

const Home = () => {
    const filters = useSelector(selectFiltersAll());
    const dispatch = useDispatch();

    const [numberOfPages, setNumberOfPages] = useState(1);
    const [numberOfResults, setNumberOfResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [showSearchMovieDialog, setShowSearchMovieDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleFiltersClearAll = () => {
        dispatch(filtersClearAll());
    };

    useEffect(() => {
        setLoading(true);

        const queryFilters = filters
            .filter((filter) => filter.value !== "")
            .map((filter) => filter.param + filter.value)
            .join("");

        fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}${queryFilters}`
        )
            .then((response) => response.json())
            .then((data) => {
                setNumberOfPages(
                    data.total_pages > 500 ? 500 : data.total_pages
                );
                setNumberOfResults(data.total_results);
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
                setMovies(results);
            })
            .catch((error) => {
                setHasError(true);
                console.error(error);
            })
            .finally(() => setLoading(false));
    }, [filters]);

    return (
        <>
            <Box
                component="section"
                width="100%"
                maxWidth={theme.maxWidth.filters}
                margin="auto">
                <Paper
                    elevation={2}
                    sx={{
                        margin: "2rem",
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
                        margin: "2rem",
                        padding: "1rem",
                    }}>
                    <Typography>
                        Nombre de résultats: {numberOfResults}{" "}
                        {numberOfResults > 10000 && (
                            <span>(10 000 max. disponibles)</span>
                        )}
                    </Typography>
                </Paper>
                {/* <Language /> */}
                <Pagination
                    numberOfPages={numberOfPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </Box>
            <Box component="section">
                {loading ? (
                    <Loader />
                ) : hasError ? (
                    <ErrorBoundary page="home" />
                ) : (
                    <MovieCardsGrid movies={movies} />
                )}
            </Box>
            <Pagination
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};

export default Home;
