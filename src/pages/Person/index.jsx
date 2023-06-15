import { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PageHeading from "../../components/PageHeading";
import PersonFilmographyList from "../../components/PersonFilmographyList";
// import PersonFilmographyCard from "../../components/PersonFilmographyCard";
import ListMovieCard from "../../components/ListMovieCard";
import Loader from "../../components/Loader";
import ErrorBoundary from "../../components/ErrorBoundary";

import { selectUserLanguage } from "../../app/selectors";
import { selectTmdbImagesSecureUrl } from "../../app/selectors";

import { getPersonFullData } from "../../utils/person";
import { isEmptyObject } from "../../utils/utils";

import { Box, Link, Typography, Button, ButtonGroup } from "@mui/material";
import theme from "../../assets/styles/theme";

const Person = () => {
    const language = useSelector(selectUserLanguage());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());
    const { personId } = useParams();

    const [person, setPerson] = useState({});
    const [personFormatedName, setPersonFormatedName] = useState("");
    const [personFormatedBirthday, setPersonFormatedBirthday] = useState("");
    const [personFormatedDeathday, setPersonFormatedDeathday] = useState("");
    const [personImgUrl, setPersonImgUrl] = useState("");
    const [personActingMovies, setPersonActingMovies] = useState([]);
    const [personDirectingMovies, setPersonDirectingMovies] = useState([]);
    const [personWritingMovies, setPersonWritingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        person.name !== undefined &&
            setPersonFormatedName(person.name.replace(" ", "_"));

        const dateOptions = { year: "numeric", month: "long", day: "numeric" };

        const birthday = new Date(person.birthday);
        setPersonFormatedBirthday(
            birthday.toLocaleDateString(language, dateOptions)
        );

        const deathday = new Date(person.deathday);
        setPersonFormatedDeathday(
            deathday.toLocaleDateString(language, dateOptions)
        );
    }, [person.name, person.birthday, person.deathday, language]);

    useEffect(() => {
        setIsLoading(true);

        getPersonFullData(personId, language, imageBaseUrl)
            .then((personData) => {
                if (!isEmptyObject(personData)) {
                    setPerson(personData.mainData);
                    setPersonImgUrl(personData.imgUrl);
                    setPersonActingMovies(
                        personData.filmography.actingMovies.map((movie) => (
                            <ListMovieCard
                                key={movie.id}
                                movie={movie}
                                imgSrc={movie.imgSrc}
                            />
                        ))
                    );
                    setPersonDirectingMovies(
                        personData.filmography.directingMovies.map((movie) => (
                            <ListMovieCard
                                key={movie.id}
                                movie={movie}
                                imgSrc={movie.imgSrc}
                            />
                        ))
                    );
                    setPersonWritingMovies(
                        personData.filmography.writingMovies.map((movie) => (
                            <ListMovieCard
                                key={movie.id}
                                movie={movie}
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

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: { xs: "column", md: "row" },
                        gap: "2rem",
                        "& img": {
                            maxWidth: "300px",
                        },
                    }}>
                    {personImgUrl && (
                        <img src={personImgUrl} alt={person.name} />
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}>
                        <Typography>
                            <Typography component="span" fontWeight="700">
                                Naissance :{" "}
                            </Typography>
                            <Typography component="span">
                                {personFormatedBirthday}
                            </Typography>
                        </Typography>
                        {person.deathday && (
                            <Typography>
                                <Typography component="span" fontWeight="700">
                                    Mort :{" "}
                                </Typography>
                                <Typography component="span">
                                    {personFormatedDeathday}
                                </Typography>
                            </Typography>
                        )}
                        {person.biography && (
                            <Typography
                                align="justify"
                                sx={{
                                    maxWidth: { md: theme.maxWidth.biography },
                                }}>
                                {person.biography}
                            </Typography>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: {
                                    xs: "center",
                                    md: "flex-start",
                                },
                            }}>
                            <ButtonGroup variant="outlined">
                                <Button size="small">
                                    <Link
                                        component={RouterLink}
                                        underline="none"
                                        to={`https://${language}.wikipedia.org/wiki/${personFormatedName}`}
                                        target="_blank"
                                        color={theme.palette.text.lightBg}
                                        fontWeight="400">
                                        Voir sur Wikipédia
                                    </Link>
                                </Button>
                                <Button size="small">
                                    <Link
                                        component={RouterLink}
                                        underline="none"
                                        to={`https://www.imdb.com/name/${person.imdb_id}/`}
                                        target="_blank"
                                        color={theme.palette.text.lightBg}
                                        fontWeight="400">
                                        Voir sur IMDB
                                    </Link>
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                </Box>

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
            </>
        )
    );
};

export default Person;
