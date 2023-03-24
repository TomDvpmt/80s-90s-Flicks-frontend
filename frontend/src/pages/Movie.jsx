import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";

import fetchData from "../utils/fetchData";
import styled from "styled-components";

const StyledMovie = styled.main`
    background-color: black;

    .movie {
        display: grid;
        align-items: center;
        color: white;
    }

    .backdrop {
        grid-row: 1;
        grid-column: 1;
        display: block;
        max-width: 100%;
        opacity: 0.2;
    }

    .details {
        grid-row: 1;
        grid-column: 1;
        max-width: 1280px;
        margin: auto;
        display: flex;
        z-index: 99;
    }

    .info {
        padding: 3rem;
    }

    h1 {
        margin: 2rem 0 1rem 0;
    }
`;

const Movie = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [movie, setMovie] = useState({});

    const id = useParams().id;

    useEffect(() => {
        fetchData(
            `https://api.themoviedb.org/3/movie/${id}?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=fr`,
            {
                method: "GET",
            }
        )
            .then((data) => setMovie(data))
            .catch((error) => {
                setErrorMessage(
                    "Impossible d'afficher les informations du film."
                );
                console.error(error);
            });
    }, [id]);

    return (
        <StyledMovie>
            <section className="movie">
                <img
                    className="backdrop"
                    src={
                        "https://image.tmdb.org/t/p/original" +
                        movie.backdrop_path
                    }
                    alt={movie.title + "(backdrop)"}
                />
                <div className="details">
                    <img
                        className="poster"
                        src={
                            "https://image.tmdb.org/t/p/w500" +
                            movie.poster_path
                        }
                        alt={movie.title + "(poster)"}
                    />
                    <div className="info">
                        <h1>{movie.title}</h1>
                        <p></p>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </section>
            <ErrorMessage errorMessage={errorMessage} />
        </StyledMovie>
    );
};

export default Movie;
