import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import YearFilter from "../components/filters/YearFilter";
import GenresFilter from "../components/filters/GenresFilter";
import SearchFilter from "../components/filters/SearchFilter";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";

import { Box, Typography } from "@mui/material";

import { allFilters } from "../assets/filters";
import fetchData from "../utils/fetchData";

import store from "../utils/store";
import { pageSetType } from "../features/page";

import styled from "styled-components";

const StyledResultsGrid = styled.div`
    background-color: black;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1rem;
`;

const Home = () => {
    store.dispatch(pageSetType("home"));

    const { state } = useLocation();
    const inheritedGenre = state;

    const [activeGenres, setActiveGenres] = useState([
        inheritedGenre && inheritedGenre.value,
    ]);
    const [filters, setFilters] = useState(allFilters);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [numberOfResults, setNumberOfResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Movie cards

    useEffect(() => {
        const queryFilters = filters
            .filter((filter) => filter.value !== "")
            .map((filter) => filter.param + filter.value)
            .join("");

        fetchData(
            `https://api.themoviedb.org/3/discover/movie?api_key=2d0a75daa1b16703efb5d87960c9e67e${queryFilters}`,
            {
                method: "GET",
            }
        )
            .then((response) => {
                setNumberOfPages(
                    response.total_pages > 500 ? 500 : response.total_pages
                );
                setNumberOfResults(response.total_results);
                const results = response.results.map((movie) => {
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
                    return <MovieCard key={movie.id} movieData={movieData} />;
                });
                setMovies(results);
            })
            .catch((error) => {
                setErrorMessage("Impossible d'afficher les films.");
                console.error(error);
            });
    }, [filters]);

    return (
        <main>
            <h1>Explorer</h1>
            <section>
                <Box
                    sx={{
                        border: "1px solid black",
                        margin: "2rem",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}>
                    <SearchFilter />
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                        }}>
                        <YearFilter
                            setCurrentPage={setCurrentPage}
                            setFilters={setFilters}
                        />
                        <GenresFilter
                            activeGenres={activeGenres}
                            setActiveGenres={setActiveGenres}
                            setFilters={setFilters}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        border: "1px solid black",
                        margin: "2rem",
                        padding: "1rem",
                    }}>
                    <Typography>
                        Nombre de résultats : {numberOfResults}{" "}
                        {numberOfResults > 10000 && (
                            <span>(10 000 disponibles)</span>
                        )}
                    </Typography>
                </Box>
                <Pagination
                    numberOfPages={numberOfPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setFilters={setFilters}
                />
                <StyledResultsGrid>{movies}</StyledResultsGrid>

                <ErrorMessage errorMessage={errorMessage} />
            </section>
        </main>
    );
};

export default Home;
