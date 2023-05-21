import { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import MovieBackdrop from "../../components/MovieBackdrop";
import MoviePoster from "../../components/MoviePoster";
import MovieCheckboxes from "../../components/MovieCheckboxes";
import MovieHeading from "../../components/MovieHeading";
import MovieTagline from "../../components/MovieTagline";
import MovieCastAndCrew from "../../components/MovieCastAndCrew";
import MovieGenres from "../../components/MovieGenres";
import MovieOverview from "../../components/MovieOverview";
import MovieBudget from "../../components/MovieBudget";
import MovieRevenue from "../../components/MovieRevenue";
import MovieIMDBLink from "../../components/MovieIMDBLink";
import MovieWikiLink from "../../components/MovieWikiLink";
import Loader from "../../components/Loader";
import ErrorBoundary from "../../components/ErrorBoundary";

import { selectUserIsSignedIn, selectUserLanguage } from "../../app/selectors";

import { getMovieData } from "../../utils/movie";
import { isEmptyObject } from "../../utils/utils";

import { Box, ButtonGroup } from "@mui/material";
import theme from "../../assets/styles/theme";

const Movie = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const language = useSelector(selectUserLanguage());

    const { id } = useParams();
    const movieId = parseInt(id);

    const [langData, setLangData] = useState({});
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setLangData(theme.languages[language].pages.movie);
    }, [language]);

    useEffect(() => {
        setIsLoading(true);
        getMovieData(movieId, language)
            .then((movieData) =>
                setMovie({ ...movieData, releaseDate: movieData.release_date })
            )
            .catch((error) => {
                console.error(error);
                setHasError(true);
            })
            .finally(() => setIsLoading(false));
    }, [movieId, language]);

    return isLoading ? (
        <Loader />
    ) : hasError ? (
        <ErrorBoundary page="movie" />
    ) : (
        <>
            {!isEmptyObject(movie) && movie.success !== false ? (
                <Box
                    component="section"
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        display: "grid",
                        justifyItems: "center",
                        alignItems: "start",
                        color: { md: theme.palette.text.darkBg },
                        "& a": {
                            color: { md: theme.palette.text.darkBg },
                        },
                    }}>
                    <MovieBackdrop
                        path={movie.backdrop_path}
                        movieTitle={movie.title}
                    />
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: theme.maxWidth.main,
                            gridColumn: "1",
                            gridRow: "1",
                            zIndex: "2",
                            p: { xs: "0 0 3rem", md: "3rem 0 3rem" },
                            display: { md: "grid" },
                            gridTemplateColumns: "1fr 1fr",
                            columnGap: "2rem",
                            alignItems: "center",
                        }}>
                        <MoviePoster
                            path={movie.poster_path}
                            movieTitle={movie.title}
                        />
                        {isSignedIn && (
                            <MovieCheckboxes
                                movieId={movieId}
                                langData={langData}
                            />
                        )}
                        <Box
                            sx={{
                                gridColumn: "2",
                                gridRow: "1",
                                padding: ".5rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}>
                            <MovieHeading
                                title={movie.title}
                                originalTitle={movie.original_title}
                            />
                            <MovieTagline tagline={movie.tagline} />
                            <MovieCastAndCrew
                                movieId={movieId}
                                releaseDate={movie.releaseDate}
                            />
                            <Box sx={{ p: "2rem" }}>
                                <MovieGenres genres={movie.genres} />
                                <MovieOverview overview={movie.overview} />
                            </Box>
                            <MovieBudget
                                movieLangData={langData}
                                budget={movie.budget}
                            />
                            <MovieRevenue
                                movieLangData={langData}
                                revenue={movie.revenue}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            <ButtonGroup variant="outlined">
                                <MovieIMDBLink
                                    imdbId={movie.imdb_id}
                                    imdbLang={langData.imdbLink}
                                />
                                <MovieWikiLink movieTitle={movie.title} />
                            </ButtonGroup>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <ErrorBoundary page="movie" />
            )}
        </>
    );
};

export default Movie;
