import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import ErrorMessage from "../components/ErrorMessage";

import fetchData from "../utils/fetchData";

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
    const { state } = useLocation();
    const inheritedFilter = state;

    const years = ["Toutes"];
    for (let i = 1980; i < 2000; i++) {
        years.push(i);
    }

    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [numberOfResults, setNumberOfResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState([
        inheritedFilter
            ? inheritedFilter
            : { name: "inheritedFilter", param: "", value: "" },
        {
            name: "allYearsMin",
            param: "&primary_release_date.gte=",
            value: "1980-01-01",
        },
        {
            name: "allYearsMax",
            param: "&release_date.lte=",
            value: "1999-12-31",
        },
        { name: "language", param: "&language=", value: "fr" },
        {
            name: "page",
            param: "&page=",
            value: currentPage,
        },
        {
            name: "primaryReleaseYear",
            param: "&primary_release_year=",
            value: "",
        },
        { name: "sortBy", param: "&sort_by=", value: "popularity.desc" },
        { name: "withGenres", param: "&with_genres=", value: "" },
        {
            name: "originalLanguage",
            param: "&with_original_language=",
            value: "en",
        },
        { name: "withPeople", param: "&with_people=", value: "" },
    ]);

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
                <h2>Trouver des films</h2>
                <form>
                    <p>
                        Nombre de résultats : {numberOfResults}{" "}
                        {numberOfResults > 10000 && (
                            <span>
                                (seuls les 10 000 premiers sont disponibles)
                            </span>
                        )}
                    </p>
                    <div>
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}>
                            Page précédente
                        </button>
                        <div onClick={handleDirectPageClick}>
                            {currentPage !== 1 && (
                                <input type="button" value="1" />
                            )}
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
                            {currentPage < numberOfPages - 3 && (
                                <span> ... </span>
                            )}
                            {currentPage !== numberOfPages && (
                                <input type="button" value={numberOfPages} />
                            )}
                        </div>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === numberOfPages}>
                            Page suivante
                        </button>
                    </div>
                    <label htmlFor="date-filter">Année : </label>
                    <select id="date-filter" onChange={handleYearChange}>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </form>
                <StyledResultsGrid>{movies}</StyledResultsGrid>
                <ErrorMessage errorMessage={errorMessage} />
            </section>
        </main>
    );
};

export default Home;
