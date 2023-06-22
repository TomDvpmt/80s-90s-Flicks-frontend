import { useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUserLanguage } from "../../features/userSlice";
import { selectTmdbImagesSecureUrl } from "../../features/configSlice";
import {
    setShowSearchMovieDialog,
    selectShowSearchMovieDialog,
} from "../../features/dialogsSlice";

import {
    TMDB_API_KEY,
    TMDB_BASE_URI,
    TMDB_EXCLUDED_GENRES,
} from "../../config/APIs";
import defaultPoster from "../../assets/img/defaultPoster.jpeg";

import ListMovieCard from "../ListMovieCard";
import Loader from "../Loader";

import theme from "../../styles/theme";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    TextField,
    useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const ACTIONS = {
    setQuery: "setQuery",
    setResults: "setResults",
    setIsLoading: "setIsLoading",
};

const SearchMovieDialog = () => {
    const showSearchMovieDialog = useSelector(selectShowSearchMovieDialog);
    const dispatch = useDispatch();

    const reducer = (state, { type, payload }) => {
        switch (type) {
            case "setQuery":
                return { ...state, query: payload };
            case "setResults":
                return { ...state, results: payload };
            case "setIsLoading":
                return { ...state, isLoading: payload };
            default:
                throw new Error("Reducer: unknown action.");
        }
    };

    const [state, localDispatch] = useReducer(reducer, {
        query: "",
        results: [],
        isLoading: false,
    });

    const language = useSelector(selectUserLanguage);
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl);

    const isWiderThanSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

    const handleChange = (e) => {
        localDispatch({ type: ACTIONS.setQuery, payload: e.target.value });
    };

    const handleClose = () => {
        localDispatch({ type: ACTIONS.setResults, payload: [] });
        dispatch(setShowSearchMovieDialog(false));
    };

    useEffect(() => {
        localDispatch({ type: ACTIONS.setQuery, payload: "" });
    }, [showSearchMovieDialog]);

    useEffect(() => {
        localDispatch({ type: ACTIONS.setIsLoading, payload: true });
        fetch(
            `${TMDB_BASE_URI}/search/movie?api_key=${TMDB_API_KEY}&query=${state.query}&include_adult=false&language=${language}`
        )
            .then((response) => response.json())
            .then((data) => {
                const movies = data.results?.filter((result) => {
                    const year = parseInt(result.release_date?.slice(0, 4));
                    return (
                        year >= 1980 &&
                        year < 2000 &&
                        result.genre_ids.reduce(
                            (acc, current) =>
                                acc && !TMDB_EXCLUDED_GENRES.includes(current),
                            true
                        )
                    );
                });
                localDispatch({
                    type: ACTIONS.setResults,
                    payload:
                        movies.length === 0 ? (
                            <Typography>Aucun résultat.</Typography>
                        ) : (
                            movies.map((movie) => {
                                const posterPath = movie.poster_path;
                                const hasPoster =
                                    posterPath !== null && posterPath !== "";
                                const imgSrc = hasPoster
                                    ? `${imageBaseUrl}w92${posterPath}`
                                    : defaultPoster;

                                return (
                                    <ListMovieCard
                                        key={movie.id}
                                        movie={movie}
                                        imgSrc={imgSrc}
                                    />
                                );
                            })
                        ),
                });
            })
            .catch((error) => console.log(error))
            .finally(() =>
                localDispatch({ type: ACTIONS.setIsLoading, payload: false })
            );
    }, [state.query, imageBaseUrl, language]);

    return (
        <Dialog
            open={showSearchMovieDialog}
            onClose={handleClose}
            fullWidth={isWiderThanSmallScreen}
            fullScreen={!isWiderThanSmallScreen}>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                Chercher un titre de film
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box component="form" pb="1.5rem">
                    <TextField
                        fullWidth
                        value={state.query}
                        onChange={handleChange}
                    />
                </Box>
                {state.results?.length > 0 && (
                    <Box sx={{ p: "2rem 0 0" }}>
                        <Typography pb=".5rem" fontWeight="700">
                            {`${state.results.length} résultat${
                                state.results.length > 1 ? "s" : ""
                            } : `}
                        </Typography>
                        {state.isLoading ? (
                            <Loader />
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: ".5rem",
                                }}>
                                {state.results}
                            </Box>
                        )}
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SearchMovieDialog;
