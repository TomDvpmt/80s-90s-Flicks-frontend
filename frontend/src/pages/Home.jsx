import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import ErrorMessage from "../components/ErrorMessage";

import { getAllFilters, years, getGenres } from "../assets/filters";
import fetchData from "../utils/fetchData";

import styled from "styled-components";

const StyledFilters = styled.div`
    border: 1px solid black;
    margin: 2rem;
    padding: 1rem;
`;

const StyledResultsGrid = styled.div`
    background-color: black;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1rem;
`;

const StyledPagination = styled.div`
    margin: 2rem;
    padding: 1rem;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    gap: 1rem;

    .page-numbers {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        input {
            padding: 0.2rem 0.5rem;
        }
    }
`;

const Home = () => {
    const { state } = useLocation();
    const inheritedFilter = state;

    const [genres, setGenres] = useState([]);
    const [filters, setFilters] = useState(getAllFilters(inheritedFilter));
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [numberOfResults, setNumberOfResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleYearChange = (e) => {
        setCurrentPage(1);
        if (e.target.value === "Toutes") {
            setFilters((filters) =>
                filters.map((filter) => {
                    if (filter.name === "primaryReleaseYear")
                        return { ...filter, value: "" };
                    else if (filter.name === "allYearsMin")
                        return { ...filter, value: "1980-01-01" };
                    else if (filter.name === "allYearsMax")
                        return { ...filter, value: "1999-12-31" };
                    else return filter;
                })
            );
        } else {
            setFilters((filters) =>
                filters.map((filter) => {
                    if (["allYearsMin", "allYearsMax"].includes(filter.name))
                        return { ...filter, value: "" };
                    else if (filter.name === "primaryReleaseYear")
                        return { ...filter, value: e.target.value };
                    else return filter;
                })
            );
        }
    };

    const handleCheckBox = (e) => {
        //
    };

    // Get genres

    useEffect(() => {
        getGenres().then((data) =>
            setGenres(
                data.map((genre) => (
                    <div key={genre.id} className="genre">
                        <label htmlFor={`genre-${genre.id}`}>
                            {genre.name}
                        </label>
                        <input
                            id={`genre-${genre.id}`}
                            name={genre.name}
                            type="checkbox"
                            value={genre.name}
                            checked={
                                !["Documentaire", "Téléfilm"].includes(
                                    genre.name
                                )
                            }
                            onChange={handleCheckBox}
                        />
                    </div>
                ))
            )
        );
    }, []);

    // Pagination

    const goToPreviousPage = (e) => {
        e.preventDefault();
        setCurrentPage((currentPage) => currentPage - 1);
    };

    const goToNextPage = (e) => {
        e.preventDefault();
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handleDirectPageClick = (e) => {
        e.target.value && setCurrentPage(parseInt(e.target.value));
    };

    useEffect(() => {
        setFilters((filters) =>
            filters.map((filter) =>
                filter.name === "page"
                    ? { name: "page", param: "&page=", value: currentPage }
                    : filter
            )
        );
    }, [currentPage]);

    // Display the movie cards

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
                <StyledFilters>
                    <form className="movie-filters">
                        <fieldset className="year-filter">
                            <legend>Année :</legend>
                            <select
                                id="date-filter"
                                onChange={handleYearChange}>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </fieldset>
                        <fieldset className="genres-filter">
                            <legend>Genres : </legend>
                            {genres}
                            <button type="button">Tous</button>
                            <button type="button">Aucun</button>
                        </fieldset>
                        <fieldset className="search-filter">
                            <legend>Recherche</legend>
                            <label>Contient l'expression : </label>
                            <input type="text" name="search" id="search" />
                        </fieldset>
                        <p className="number-of-results">
                            Nombre de résultats : {numberOfResults}{" "}
                            {numberOfResults > 10000 && (
                                <span>(10 000 disponibles)</span>
                            )}
                        </p>
                    </form>
                </StyledFilters>

                <StyledPagination className="pagination">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}>
                        Page précédente
                    </button>
                    <div
                        className="page-numbers"
                        onClick={handleDirectPageClick}>
                        {currentPage !== 1 && <input type="button" value="1" />}
                        {currentPage > 4 && <span> ... </span>}
                        {currentPage > 3 && (
                            <input type="button" value={currentPage - 2} />
                        )}
                        {currentPage > 2 && (
                            <input type="button" value={currentPage - 1} />
                        )}
                        <strong>{currentPage}</strong>
                        {currentPage < numberOfPages - 1 && (
                            <input type="button" value={currentPage + 1} />
                        )}
                        {currentPage < numberOfPages - 2 && (
                            <input type="button" value={currentPage + 2} />
                        )}
                        {currentPage < numberOfPages - 3 && <span> ... </span>}
                        {currentPage !== numberOfPages && (
                            <input type="button" value={numberOfPages} />
                        )}
                    </div>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === numberOfPages}>
                        Page suivante
                    </button>
                </StyledPagination>
                <StyledResultsGrid>{movies}</StyledResultsGrid>
                <ErrorMessage errorMessage={errorMessage} />
            </section>
        </main>
    );
};

export default Home;
