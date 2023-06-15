import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
    selectTmdbImagesSecureUrl,
    selectUserLanguage,
} from "../../app/selectors";

import { TMDB_API_KEY } from "../../utils/config";
import defaultPoster from "../../assets/img/defaultPoster.jpeg";

import ListMovieCard from "../ListMovieCard";
import Loader from "../Loader";

import theme from "../../assets/styles/theme";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Box,
    Typography,
    IconButton,
    TextField,
    useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import PropTypes from "prop-types";

const SearchMovieDialog = ({
    showSearchMovieDialog,
    setShowSearchMovieDialog,
}) => {
    SearchMovieDialog.propTypes = {
        showSearchMovieDialog: PropTypes.bool.isRequired,
        setShowSearchMovieDialog: PropTypes.func.isRequired,
    };

    const language = useSelector(selectUserLanguage());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());

    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleClose = () => {
        setShowSearchMovieDialog(false);
    };

    useEffect(() => {
        setResults([]);
    }, []);

    useEffect(() => {
        setQuery("");
    }, [showSearchMovieDialog]);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&include_adult=false&language=${language}`
        )
            .then((response) => response.json())
            .then((data) => {
                const movies = data.results?.filter((result) => {
                    const year = parseInt(result.release_date?.slice(0, 4));
                    return (
                        year >= 1980 &&
                        year < 2000 &&
                        // exclude Documentary (99) and Television film (10770)
                        !result.genre_ids?.includes(99) &&
                        !result.genre_ids.includes(10770)
                    );
                });

                setResults(
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
                    )
                );
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, [query, imageBaseUrl, language]);

    return (
        <Dialog
            open={showSearchMovieDialog}
            onClose={handleClose}
            fullWidth={isSmallScreen}
            fullScreen={!isSmallScreen}>
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
                <Box component="form">
                    <TextField
                        fullWidth
                        value={query}
                        onChange={handleChange}
                    />
                </Box>
                {results?.length > 0 && (
                    <Box sx={{ p: "2rem 0 0" }}>
                        <Typography pb=".5rem" fontWeight="700">
                            {`${results.length} résultat${
                                results.length > 1 ? "s" : ""
                            } : `}
                        </Typography>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: ".5rem",
                                }}>
                                {results}
                            </Box>
                        )}
                    </Box>
                )}
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
};

export default SearchMovieDialog;
