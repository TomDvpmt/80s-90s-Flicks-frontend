import { useState, useEffect } from "react";

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
    const allYearsFilter =
        "&primary_release_date.gte=1980-01-01&release_date.lte=1999-12-31";

    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState(allYearsFilter);
    const [errorMessage, setErrorMessage] = useState("");
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [numberOfResults, setNumberOfResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const years = ["Toutes"];
    for (let i = 1980; i < 2000; i++) {
        years.push(i);
    }

    const handleYearChange = (e) => {
        setCurrentPage(1);
        const dateFilterString = "&primary_release_year=";
        const start = filters.indexOf(dateFilterString);
        const end = start + dateFilterString.length + 4;
        const prevDateFilter = filters.slice(start, end);
        const newDateFilter = `&primary_release_year=${e.target.value}`;

        if (filters.includes(allYearsFilter)) {
            setFilters((filters) =>
                filters.replace(allYearsFilter, newDateFilter)
            );
        } else if (filters.includes(dateFilterString)) {
            e.target.value === "Toutes"
                ? setFilters((filters) =>
                      filters.replace(prevDateFilter, allYearsFilter)
                  )
                : setFilters((filters) =>
                      filters.replace(prevDateFilter, newDateFilter)
                  );
        }
    };

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
        fetchData(
            `https://api.themoviedb.org/3/discover/movie?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=fr${filters}&with_original_language=en&page=${currentPage}&sort_by=popularity.desc`,
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
                        title: movie.title,
                        originalTitle: movie.original_title,
                        genres: movie.genre_ids,
                        overview: movie.overview,
                        backdropPath: movie.backdrop_path,
                        posterPath: movie.poster_path,
                        releaseDate: movie.release_date,
                        voteAverage: movie.vote_average,
                    };
                    return <MovieCard key={movie.id} movieData={movieData} />;
                });
                setMovies(results);
            })
            .catch((error) => {
                setErrorMessage("Impossible d'afficher les films.");
                console.error(error);
            });
    }, [filters, currentPage]);

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
                    <p>Filters : {filters}</p>
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
