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

    const years = ["Toutes"];
    for (let i = 1980; i < 2000; i++) {
        years.push(i);
    }

    const handleYearChange = (e) => {
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

    useEffect(() => {
        fetchData(
            `https://api.themoviedb.org/3/discover/movie?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=fr${filters}&with_original_language=en&sort_by=popularity.desc`,
            {
                method: "GET",
            }
        )
            .then((response) => {
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
    }, [filters]);

    return (
        <main>
            <h1>Explorer</h1>
            <section>
                <h2>Trouver des films</h2>
                <form>
                    <p>Filters : {filters}</p>
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
                <div>[PAGINATION]</div>
            </section>
        </main>
    );
};

export default Home;
