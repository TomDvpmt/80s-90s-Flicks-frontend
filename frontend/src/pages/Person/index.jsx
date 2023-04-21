import { useState, useEffect } from "react";
import { useParams, Link, useLoaderData } from "react-router-dom";
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

    const language = useSelector(selectUserLanguage());

    const personData = useLoaderData();

    useEffect(() => {
        setPerson(personData.mainData);
        setPersonImgUrl(personData.imgUrl);
        setPersonActingMovies(personData.filmography.actingMovies);
        setPersonDirectingMovies(personData.filmography.directingMovies);
    }, [personData]);

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
        </StyledPerson>
    );
};

export default Person;
