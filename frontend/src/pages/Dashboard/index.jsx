import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MovieCard from "../../components/MovieCard";
import SideNav from "../../layout/SideNav";

import {
    selectUserMoviesSeen,
    selectUserMoviesToSee,
    selectUserFavorites,
    selectUserLanguage,
} from "../../services/utils/selectors";

import { getMovieData } from "../../utils/movie";

import { Box, Paper, Typography } from "@mui/material";

import theme from "../../assets/styles/theme";

const moviesSectionSx = {
    padding: "1rem",
    "& h2": {
        mb: "1rem",
    },
};

const Dashboard = () => {
    const language = useSelector(selectUserLanguage());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const moviesToSee = useSelector(selectUserMoviesToSee());
    const favorites = useSelector(selectUserFavorites());

    const [uniqueMovies, setUniqueMovies] = useState([]);
    const [moviesSeenLinks, setMoviesSeenLinks] = useState([]);
    const [moviesToSeeLinks, setMoviesToSeeLinks] = useState([]);
    const [favoritesLinks, setFavoritesLinks] = useState([]);

    // Get all movies data from MoviesSeen and MoviesToSee, without duplicates
    useEffect(() => {
        const allMoviesIds = moviesSeen.concat(moviesToSee).concat(favorites);
        Promise.all(
            allMoviesIds.map(async (id) => {
                return getMovieData(id, language)
                    .then((movie) => {
                        return {
                            id: movie.id,
                            title: movie.title,
                            releaseDate: movie.release_date,
                            posterPath: movie.poster_path,
                        };
                    })
                    .catch((error) => console.log(error));
            })
        )
            .then((data) =>
                // getting rid of duplicates
                setUniqueMovies(
                    data.filter(
                        (movie, index, array) =>
                            array.findIndex((mov) => mov.id === movie.id) ===
                            index
                    )
                )
            )
            .catch((error) => console.log(error));
    }, [moviesSeen, moviesToSee, favorites, language]);

    // Display movie cards for each section of the dashboard
    useEffect(() => {
        const getLinks = (uniqueMovies, moviesSection) =>
            uniqueMovies
                .filter((movie) => moviesSection.includes(movie.id))
                .map((movie) => {
                    return (
                        <MovieCard
                            key={movie.id}
                            page="dashboard"
                            movie={movie}
                        />
                    );
                });

        setMoviesSeenLinks(getLinks(uniqueMovies, moviesSeen));
        setMoviesToSeeLinks(getLinks(uniqueMovies, moviesToSee));
        setFavoritesLinks(getLinks(uniqueMovies, favorites));
    }, [uniqueMovies, moviesSeen, moviesToSee, favorites]);

    return (
        <Box maxWidth={theme.maxWidth.main} margin="auto">
            <Typography component="h1" variant="h1">
                Tableau de bord
            </Typography>
            <Box
                sx={{
                    padding: {
                        sm: ".5rem",
                    },
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                }}>
                <SideNav />
                <Box
                    component="main"
                    sx={{
                        width: "100%",
                        padding: {
                            xs: "0 .5rem .5rem",
                        },
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}>
                    <Paper
                        component="section"
                        elevation={4}
                        sx={moviesSectionSx}>
                        <Typography id="toSee" component="h2" variant="h2">
                            À voir
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "1rem",
                            }}>
                            {moviesToSeeLinks}
                        </Box>
                    </Paper>
                    <Paper
                        component="section"
                        elevation={4}
                        sx={moviesSectionSx}>
                        <Typography id="seen" component="h2" variant="h2">
                            Déjà vus
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "1rem",
                            }}>
                            {moviesSeenLinks}
                        </Box>
                    </Paper>
                    <Paper
                        component="section"
                        elevation={4}
                        sx={moviesSectionSx}>
                        <Typography id="favorites" component="h2" variant="h2">
                            Favoris
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "1rem",
                            }}>
                            {favoritesLinks}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
