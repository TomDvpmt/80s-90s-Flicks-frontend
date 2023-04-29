import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

import PageHeading from "../../components/PageHeading";

import { selectUserLanguage } from "../../app/selectors";

import { isEmptyObject } from "../../utils/utils";

import { Typography } from "@mui/material";

import styled from "styled-components";

const StyledImg = styled.div`
    img: {
        max-width: 300px;
    }
`;

const Person = () => {
    const [person, setPerson] = useState({});
    const [personImgUrl, setPersonImgUrl] = useState("");
    const [personActingMovies, setPersonActingMovies] = useState([]);
    const [personDirectingMovies, setPersonDirectingMovies] = useState([]);

    const language = useSelector(selectUserLanguage());

    const personData = useLoaderData();
    const personFormatedName =
        person.name !== undefined && person.name.replace(" ", "_");

    useEffect(() => {
        if (!isEmptyObject(personData)) {
            setPerson(personData.mainData);
            setPersonImgUrl(personData.imgUrl);
            setPersonActingMovies(personData.filmography.actingMovies);
            setPersonDirectingMovies(personData.filmography.directingMovies);
        }
    }, [personData]);

    return (
        !isEmptyObject(person) && (
            <>
                <PageHeading text={person.name} />
                {personImgUrl && (
                    <StyledImg>
                        <img src={personImgUrl} alt={person.name} />
                    </StyledImg>
                )}
                <Typography component="h2">Filmographie</Typography>
                {personDirectingMovies.length > 0 && (
                    <>
                        <Typography component="h3">
                            {person.gender === 1
                                ? "Réalisatrice"
                                : "Réalisateur"}
                        </Typography>
                        <ul>{personDirectingMovies}</ul>
                    </>
                )}
                {personActingMovies.length > 0 && (
                    <>
                        <Typography component="h3">
                            {person.gender === 1 ? "Actrice" : "Acteur"}
                        </Typography>
                        <ul>{personActingMovies}</ul>
                    </>
                )}
                <Link
                    to={`https://${language}.wikipedia.org/wiki/${personFormatedName}`}
                    target="_blank">
                    Voir sur Wikipédia
                </Link>
            </>
        )
    );
};

export default Person;
