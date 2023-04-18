import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ErrorMessage from "../../components/ErrorMessage";

import { TMDB_API_KEY } from "../../utils/config";
import { selectUserLanguage } from "../../services/utils/selectors";

import { Typography } from "@mui/material";

import styled from "styled-components";

const StyledPerson = styled.main`
    .person__img {
        max-width: 300px;
    }
`;

const Person = () => {
    const [person, setPerson] = useState({});
    const [personFormatedName, setPersonFormatedName] = useState("");
    const [personImgUrl, setPersonImgUrl] = useState("");
    const [personActingMovies, setPersonActingMovies] = useState([]);
    const [personDirectingMovies, setPersonDirectingMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const personId = useParams().id;
    const language = useSelector(selectUserLanguage());

    /**
     * Get a person's filmography
     *
     * @param {Object} data - The person's movie credits data from TMDB API
     * @param {String} type - The type of credits ("acting", "directing"...)
     * @returns {Array}
     */

    const getFilmography = (data, type) => {
        let baseArray = [];
        if (type === "acting" && data.cast) baseArray = data.cast;
        else if (type === "directing" && data.crew) baseArray = data.crew;

        const movies =
            baseArray &&
            baseArray
                .filter(
                    (movie) =>
                        movie.release_date &&
                        (type === "acting"
                            ? movie.adult === false
                            : movie.adult === false &&
                              movie.job === "Director") &&
                        !movie.genre_ids.includes(99 || 10770) &&
                        movie.genre_ids.length > 0
                )
                .sort(
                    (a, b) =>
                        parseInt(a.release_date.slice(0, 4)) -
                        parseInt(b.release_date.slice(0, 4))
                )
                .map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>{movie.title} </Link>
                        {movie.title !== movie.original_title && (
                            <span>
                                (<em>{movie.original_title}</em>)
                            </span>
                        )}{" "}
                        {movie.release_date && (
                            <span>({movie.release_date.slice(0, 4)})</span>
                        )}{" "}
                        {type === "acting" && movie.character && (
                            <span>: {movie.character}</span>
                        )}
                    </li>
                ));
        return movies;
    };

    // Get the person's main data
    useEffect(() => {
        personId &&
            fetch(
                `https://api.themoviedb.org/3/person/${personId}?api_key=${TMDB_API_KEY}&language=${language}`
            )
                .then((response) => response.json())
                .then((data) => setPerson(data))
                .catch((error) => {
                    setErrorMessage(
                        "Impossible d'afficher les données de la personne."
                    );
                    console.error(error);
                });
    }, [personId, language]);

    // Get the person's filmography
    useEffect(() => {
        personId &&
            fetch(
                `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${TMDB_API_KEY}&language=${language}&with_original_language=en`
            )
                .then((response) => response.json())
                .then((data) => {
                    const actingMovies = getFilmography(data, "acting");
                    const directingMovies = getFilmography(data, "directing");
                    setPersonActingMovies(actingMovies);
                    setPersonDirectingMovies(directingMovies);
                })
                .catch((error) => {
                    setErrorMessage(
                        "Impossible de récupérer la filmographie de la personne."
                    );
                    console.error(error);
                });
    }, [personId, language]);

    // Set the person's formated name for Wikipedia requests and link
    useEffect(() => {
        if (person.name) {
            setPersonFormatedName(person.name.replace(" ", "_"));
        }
    }, [person]);

    // Get the person's photo from Wikipedia API
    // API documentation : https://en.wikipedia.org/w/api.php
    useEffect(() => {
        // To avoid CORS blocking, include "origin=*" in fetch url
        personFormatedName &&
            fetch(
                `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=thumbnail&pithumbsize=300&origin=*&titles=${personFormatedName}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    const firstPart = data.query.pages;
                    const imgUrl = Object.keys(firstPart).reduce(
                        (acc, key) =>
                            firstPart[key].thumbnail &&
                            firstPart[key].thumbnail.source,
                        ""
                    );
                    setPersonImgUrl(imgUrl);
                })
                .catch();
    }, [personFormatedName]);

    return (
        <StyledPerson>
            <Typography component="h1" variant="h1">
                {person.name}
            </Typography>
            {personImgUrl && (
                <img
                    className="person__img"
                    src={personImgUrl}
                    alt={person.name}
                />
            )}
            <Typography component="h2">Filmography</Typography>
            {personDirectingMovies.length > 0 && (
                <>
                    <Typography component="h3">Director</Typography>
                    <ul>{personDirectingMovies}</ul>
                </>
            )}
            {personActingMovies.length > 0 && (
                <>
                    <Typography component="h3">
                        {person.gender === 1 ? "Actress" : "Actor"}
                    </Typography>
                    <ul>{personActingMovies}</ul>
                </>
            )}
            <Link
                to={`https://${language}.wikipedia.org/wiki/${personFormatedName}`}
                target="_blank">
                See on Wikipedia
            </Link>
            <ErrorMessage errorMessage={errorMessage} />
        </StyledPerson>
    );
};

export default Person;
