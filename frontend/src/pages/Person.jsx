import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";

import { fetchData } from "../utils/requests";

import store from "../utils/store";
import { pageSetType } from "../features/page";

import styled from "styled-components";

const StyledPerson = styled.main`
    .person__img {
        max-width: 300px;
    }
`;

const Person = () => {
    useEffect(() => {
        store.dispatch(pageSetType("person"));
    }, []);

    const [person, setPerson] = useState({});
    const [personImgUrl, setPersonImgUrl] = useState("");
    const [personActingMovies, setPersonActingMovies] = useState([]);
    const [personDirectingMovies, setPersonDirectingMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const personId = useParams().id;

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
                            : movie.adult === false && movie.job === "Director")
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
            fetchData(
                `https://api.themoviedb.org/3/person/${personId}?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=fr`
            )
                .then((data) => setPerson(data))
                .catch((error) => {
                    setErrorMessage(
                        "Impossible d'afficher les données de la personne."
                    );
                    console.error(error);
                });
    }, [personId]);

    // Get the person's filmography
    useEffect(() => {
        personId &&
            fetchData(
                `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=fr&with_original_language=en`
            )
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
    }, [personId]);

    // Get the person's photo from Wikipedia API
    // API documentation : https://en.wikipedia.org/w/api.php
    useEffect(() => {
        if (person.name) {
            const personName = person.name;
            const personFormatedName = personName.replace(" ", "_");

            // To avoid CORS blocking, include "origin=*" in fetch url
            personFormatedName &&
                fetchData(
                    `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=thumbnail&pithumbsize=300&origin=*&titles=${personFormatedName}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
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
        }
    }, [person]);

    return (
        <StyledPerson>
            <h1>{person.name}</h1>
            {personImgUrl && (
                <img
                    className="person__img"
                    src={personImgUrl}
                    alt={person.name}
                />
            )}
            <h2>Filmographie</h2>
            {personDirectingMovies.length > 0 && (
                <>
                    <h3>
                        {person.gender === 1 ? "Réalisatrice" : "Réalisateur"}
                    </h3>
                    <ul>{personDirectingMovies}</ul>
                </>
            )}
            {personActingMovies.length > 0 && (
                <>
                    <h3>{person.gender === 1 ? "Actrice" : "Acteur"}</h3>
                    <ul>{personActingMovies}</ul>
                </>
            )}

            <ErrorMessage errorMessage={errorMessage} />
        </StyledPerson>
    );
};

export default Person;
