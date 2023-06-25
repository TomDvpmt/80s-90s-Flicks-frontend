import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PageHeading from "../../layout/PageHeading";
import PersonInfo from "../../features/person/components/PersonInfo";
import PersonFilmographyList from "../../features/person/components/PersonFilmographyList";
import ListMovieCard from "../../features/movie/components/ListMovieCard";
import Loader from "../../components/Loader";
import ErrorBoundary from "../../components/ErrorBoundary";

import { selectUserLanguage } from "../../features/user/userSlice";
import { selectTmdbImagesSecureUrl } from "../../config/configSlice";

import { getPersonFullData } from "../../features/person/personUtils";
import { isEmptyObject } from "../../utils/helpers";

import { Box, Typography } from "@mui/material";
import theme from "../../theme/theme";

const ACTIONS = {
    setPerson: "setPerson",
    setPersonFormatedName: "setPersonFormatedName",
    setPersonFormatedBirthday: "setPersonFormatedBirthday",
    setPersonFormatedDeathday: "setPersonFormatedDeathday",
    setPersonImgUrl: "setPersonImgUrl",
    setPersonActingMovies: "setPersonActingMovies",
    setPersonDirectingMovies: "setPersonDirectingMovies",
    setPersonWritingMovies: "setPersonWritingMovies",
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
        isLoading: true,
        hasError: false,
    });

    // birthday - deathday
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

    // person data
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
    }, [personId, language, imageBaseUrl]);

    return state.isLoading ? (
        <Loader />
    ) : state.hasError ? (
        <ErrorBoundary page="person" />
    ) : (
        state.person && (
            <>
                <PageHeading text={state.person.name} />
                <PersonInfo state={state} />
                <Box>
                    <Typography component="h2" variant="h2" m="4rem 0 3rem">
                        {theme.languages[language].pages.person.filmography}
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
