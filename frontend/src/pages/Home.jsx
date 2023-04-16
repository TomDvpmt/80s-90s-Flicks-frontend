import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MovieCard from "../components/MovieCard";
import YearFilter from "../components/filters/YearFilter";
import GenresFilter from "../components/filters/GenresFilter";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";
import Language from "../components/Language";

import store from "../services/utils/store";
import { filtersClearAll } from "../services/features/filters";
import { selectFiltersAll } from "../services/utils/selectors";

import { setUserInfo } from "../utils/requests";

import theme from "../assets/styles/theme";

import { Box, Paper, Typography, Button, Grid } from "@mui/material";

const Home = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);

    const filters = useSelector(selectFiltersAll());

    const [numberOfPages, setNumberOfPages] = useState(1);
    const [numberOfResults, setNumberOfResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFiltersClearAll = () => {
        store.dispatch(filtersClearAll());
    };

    useEffect(() => {
        const queryFilters = filters
            .filter((filter) => filter.value !== "")
            .map((filter) => filter.param + filter.value)
            .join("");

        fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=2d0a75daa1b16703efb5d87960c9e67e${queryFilters}`,
            {
                method: "GET",
            }
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
                        originalTitle: movie.original_title,
                        tagline: movie.tagline,
                        genres: movie.genres,
                        overview: movie.overview,
                        backdropPath: movie.backdrop_path,
                        posterPath: movie.poster_path,
                        releaseDate: movie.release_date,
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
                setErrorMessage("Impossible d'afficher les films.");
                console.error(error);
            });
    }, [filters]);

    return (
        <Box component="main">
            <h1>Explorer</h1>
            <Box
                component="section"
                maxWidth={theme.maxWidth.filters.desktop}
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
                            onClick={handleFiltersClearAll}>
                            Aucun filtre
                        </Button>
                    </Box>
                </Paper>
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
                <Language />
                <Pagination
                    numberOfPages={numberOfPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </Box>
            <Box component="section">
                <ErrorMessage errorMessage={errorMessage} />
                <Grid
                    container
                    columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                    spacing={{ xs: 2, md: 6 }}
                    bgcolor="black">
                    {movies}
                </Grid>
            </Box>
        </Box>
    );
};

export default Home;
