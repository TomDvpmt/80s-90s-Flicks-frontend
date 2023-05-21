import { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PageHeading from "../../components/PageHeading";
import PersonFilmographyList from "../../components/PersonFilmographyList";
import PersonFilmographyCard from "../../components/PersonFilmographyCard";
import Loader from "../../components/Loader";
import ErrorBoundary from "../../components/ErrorBoundary";

import { selectUserLanguage } from "../../app/selectors";
import { selectTmdbImagesSecureUrl } from "../../app/selectors";

import { getPersonFullData } from "../../utils/person";
import { isEmptyObject } from "../../utils/utils";

import { Box, Link, Typography, Button, Container } from "@mui/material";

const Person = () => {
    const language = useSelector(selectUserLanguage());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());
    const { personId } = useParams();

    const [person, setPerson] = useState({});
    const [personFormatedName, setPersonFormatedName] = useState("");
    const [personImgUrl, setPersonImgUrl] = useState("");
    const [personActingMovies, setPersonActingMovies] = useState([]);
    const [personDirectingMovies, setPersonDirectingMovies] = useState([]);
    const [personWritingMovies, setPersonWritingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        person.name !== undefined &&
            setPersonFormatedName(person.name.replace(" ", "_"));
    }, [person.name]);

    useEffect(() => {
        setIsLoading(true);

        getPersonFullData(personId, language, imageBaseUrl)
            .then((personData) => {
                if (!isEmptyObject(personData)) {
                    setPerson(personData.mainData);
                    setPersonImgUrl(personData.imgUrl);
                    setPersonActingMovies(
                        personData.filmography.actingMovies.map((movie) => (
                            <PersonFilmographyCard
                                key={movie.id}
                                movie={movie}
                                type="acting"
                                imgSrc={movie.imgSrc}
                            />
                        ))
                    );
                    setPersonDirectingMovies(
                        personData.filmography.directingMovies.map((movie) => (
                            <PersonFilmographyCard
                                key={movie.id}
                                movie={movie}
                                type="directing"
                                imgSrc={movie.imgSrc}
                            />
                        ))
                    );
                    setPersonWritingMovies(
                        personData.filmography.writingMovies.map((movie) => (
                            <PersonFilmographyCard
                                key={movie.id}
                                movie={movie}
                                type="writing"
                                imgSrc={movie.imgSrc}
                            />
                        ))
                    );
                }
            })
            .catch((error) => {
                console.error(error);
                setHasError(true);
            })
            .finally(() => setIsLoading(false));
    }, [personId, language, imageBaseUrl]);

    return isLoading ? (
        <Loader />
    ) : hasError ? (
        <ErrorBoundary page="person" />
    ) : (
        !isEmptyObject(person) && (
            <>
                <PageHeading text={person.name} />
                {personImgUrl && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            "& img": {
                                maxWidth: "300px",
                            },
                        }}>
                        <img src={personImgUrl} alt={person.name} />
                    </Box>
                )}
                <Box>
                    <Typography component="h2" variant="h2" m="4rem 0 3rem">
                        Filmographie
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: {
                                xs: "center",
                                md: "flex-start",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: "3rem",
                        }}>
                        <PersonFilmographyList
                            personGender={person.gender}
                            movies={personDirectingMovies}
                            type="directing"
                        />
                        <PersonFilmographyList
                            personGender={person.gender}
                            movies={personWritingMovies}
                            type="writing"
                        />
                        <PersonFilmographyList
                            personGender={person.gender}
                            movies={personActingMovies}
                            type="acting"
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="outlined" sx={{ mt: "3rem" }}>
                        <Link
                            component={RouterLink}
                            underline="none"
                            to={`https://${language}.wikipedia.org/wiki/${personFormatedName}`}
                            target="_blank">
                            Voir sur Wikipédia
                        </Link>
                    </Button>
                </Box>
            </>
        )
    );
};

export default Person;
