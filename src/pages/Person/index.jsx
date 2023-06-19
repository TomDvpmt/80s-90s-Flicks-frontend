import { useEffect, useReducer } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PageHeading from "../../components/PageHeading";
import PersonFilmographyList from "../../components/PersonFilmographyList";
import ListMovieCard from "../../components/ListMovieCard";
import Loader from "../../components/Loader";
import ErrorBoundary from "../../components/ErrorBoundary";

import { selectUserLanguage } from "../../features/userSlice";
import { selectTmdbImagesSecureUrl } from "../../features/tmdbSlice";

import { getPersonFullData } from "../../utils/person";
import { isEmptyObject } from "../../utils/helpers";

import { Box, Link, Typography, Button, ButtonGroup } from "@mui/material";
import theme from "../../styles/theme";

const ACTIONS = {
    setPerson: "setPerson",
    setPersonFormatedName: "setPersonFormatedName",
    setPersonFormatedBirthday: "setPersonFormatedBirthday",
    setPersonFormatedDeathday: "setPersonFormatedDeathday",
    setPersonImgUrl: "setPersonImgUrl",
    setPersonActingMovies: "setPersonActingMovies",
    setPersonDirectingMovies: "setPersonDirectingMovies",
    setPersonWritingMovies: "setPersonWritingMovies",
    setShowSearchMovieDialog: "setShowSearchMovieDialog",
    setIsLoading: "setIsLoading",
    setHasError: "setHasError",
};

const Person = () => {
    const language = useSelector(selectUserLanguage);
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl);
    const { personId } = useParams();

    const reducer = (state, { type, payload }) => {
        switch (type) {
            case "setPerson":
                return { ...state, person: payload };
            case "setPersonFormatedName":
                return { ...state, personFormatedName: payload };
            case "setPersonFormatedBirthday":
                return { ...state, personFormatedBirthday: payload };
            case "setPersonFormatedDeathday":
                return { ...state, personFormatedDeathday: payload };
            case "setPersonImgUrl":
                return { ...state, personImgUrl: payload };
            case "setPersonActingMovies":
                return { ...state, personActingMovies: payload };
            case "setPersonDirectingMovies":
                return { ...state, personDirectingMovies: payload };
            case "setPersonWritingMovies":
                return { ...state, personWritingMovies: payload };
            case "setShowSearchMovieDialog":
                return { ...state, showSearchMovieDialog: payload };
            case "setIsLoading":
                return { ...state, isLoading: payload };
            case "setHasError":
                return { ...state, hasError: payload };
            default:
                throw new Error("Reducer: unknown action.");
        }
    };

    const [state, localDispatch] = useReducer(reducer, {
        person: {},
        personFormatedName: "",
        personFormatedBirthday: "",
        personFormatedDeathday: "",
        personImgUrl: "",
        personActingMovies: [],
        personDirectingMovies: [],
        personWritingMovies: [],
        showSearchMovieDialog: false,
        isLoading: true,
        hasError: false,
    });

    useEffect(() => {
        state.person?.name &&
            localDispatch({
                type: ACTIONS.setPersonFormatedName,
                payload: state.person.name.replace(" ", "_"),
            });

        const dateOptions = { year: "numeric", month: "long", day: "numeric" };

        const birthday = new Date(state.person.birthday);
        localDispatch({
            type: ACTIONS.setPersonFormatedBirthday,
            payload: birthday.toLocaleDateString(language, dateOptions),
        });

        const deathday = new Date(state.person.deathday);
        localDispatch({
            type: ACTIONS.setPersonFormatedDeathday,
            payload: deathday.toLocaleDateString(language, dateOptions),
        });
    }, [state.person, language]);

    useEffect(() => {
        localDispatch({ type: ACTIONS.setIsLoading, payload: true });

        getPersonFullData(personId, language, imageBaseUrl)
            .then((personData) => {
                if (!isEmptyObject(personData)) {
                    localDispatch({
                        type: ACTIONS.setPerson,
                        payload: personData.mainData,
                    });
                    localDispatch({
                        type: ACTIONS.setPersonImgUrl,
                        payload: personData.imgUrl,
                    });

                    const getListMovieCard = (movie) => (
                        <ListMovieCard
                            key={movie.id}
                            movie={movie}
                            imgSrc={movie.imgSrc}
                            location="person"
                            reducer={{
                                ACTIONS,
                                state,
                                localDispatch,
                            }}
                        />
                    );

                    localDispatch({
                        type: ACTIONS.setPersonActingMovies,
                        payload: personData.filmography.actingMovies.map(
                            (movie) => getListMovieCard(movie)
                        ),
                    });
                    localDispatch({
                        type: ACTIONS.setPersonDirectingMovies,
                        payload: personData.filmography.directingMovies.map(
                            (movie) => getListMovieCard(movie)
                        ),
                    });
                    localDispatch({
                        type: ACTIONS.setPersonWritingMovies,
                        payload: personData.filmography.writingMovies.map(
                            (movie) => getListMovieCard(movie)
                        ),
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                localDispatch({ type: ACTIONS.setHasError, payload: true });
            })
            .finally(() => {
                localDispatch({ type: ACTIONS.setIsLoading, payload: false });
            });
    }, [personId, language, imageBaseUrl, state]);

    return state.isLoading ? (
        <Loader />
    ) : state.hasError ? (
        <ErrorBoundary page="person" />
    ) : (
        state.person && (
            <>
                <PageHeading text={state.person.name} />

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
                    {state.personImgUrl && (
                        <img src={state.personImgUrl} alt={state.person.name} />
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
                                {state.personFormatedBirthday}
                            </Typography>
                        </Typography>
                        {state.person.deathday && (
                            <Typography>
                                <Typography component="span" fontWeight="700">
                                    Mort :{" "}
                                </Typography>
                                <Typography component="span">
                                    {state.personFormatedDeathday}
                                </Typography>
                            </Typography>
                        )}
                        {state.person.biography && (
                            <Typography
                                align="justify"
                                sx={{
                                    maxWidth: { md: theme.maxWidth.biography },
                                }}>
                                {state.person.biography}
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
                                        to={`https://${language}.wikipedia.org/wiki/${state.personFormatedName}`}
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
                                        to={`https://www.imdb.com/name/${state.person.imdb_id}/`}
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
                            personGender={state.person.gender}
                            movies={state.personDirectingMovies}
                            type="directing"
                        />
                        <PersonFilmographyList
                            personGender={state.person.gender}
                            movies={state.personWritingMovies}
                            type="writing"
                        />
                        <PersonFilmographyList
                            personGender={state.person.gender}
                            movies={state.personActingMovies}
                            type="acting"
                        />
                    </Box>
                </Box>
            </>
        )
    );
};

export default Person;
