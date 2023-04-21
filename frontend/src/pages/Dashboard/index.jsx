import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import MovieCard from "../../components/MovieCard";

import { getMovieData } from "../../utils/requests";
import {
    selectUserLanguage,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../../services/utils/selectors";

import { Stack, Box, Typography } from "@mui/material";

const moviesTypeSx = {
    border: "1px solid black",
    padding: "1rem",
    "& h2": {
        mb: "1rem",
    },
};

const Dashboard = () => {
    const language = useSelector(selectUserLanguage());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const moviesToSee = useSelector(selectUserMoviesToSee());

    const [uniqueMovies, setUniqueMovies] = useState([]);
    const [moviesSeenLinks, setMoviesSeenLinks] = useState([]);
    const [moviesToSeeLinks, setMoviesToSeeLinks] = useState([]);

    // Get all movies data from MoviesSeen and MoviesToSee, without duplicates
    useEffect(() => {
        const allMoviesIds = moviesSeen.concat(moviesToSee);

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
    }, [moviesSeen, moviesToSee, language]);

    // Display movie cards for each section of the dashboard
    useEffect(() => {
        const getLinks = (uniqueMovies, moviesType) =>
            uniqueMovies
                .filter((movie) => moviesType.includes(`${movie.id}`))
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
    }, [uniqueMovies, moviesSeen, moviesToSee]);

    return (
        <>
            <Box component="main">
                <Typography component="h1" variant="h1">
                    Tableau de bord
                </Typography>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Box
                        component="section"
                        sx={{
                            minHeight: "100vh",
                            padding: "1rem",
                            border: "1px solid black",
                        }}>
                        <Stack component="nav">
                            <NavLink to="/dashboard/#toSee">À voir</NavLink>
                            <NavLink to="/dashboard/#seen">Déjà vus</NavLink>
                            <NavLink to="/dashboard/#liked">Favoris</NavLink>
                            <NavLink to="/dashboard/#reviews">
                                Mes critiques
                            </NavLink>
                        </Stack>
                    </Box>

                    <Box
                        component="section"
                        sx={{
                            border: "1px solid black",
                            padding: "1rem",
                            flexGrow: "1",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}>
                        <Box sx={moviesTypeSx}>
                            <h2 id="toSee">À voir</h2>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "1rem",
                                }}>
                                {moviesToSeeLinks}
                            </Box>
                        </Box>
                        <Box sx={moviesTypeSx}>
                            <h2 id="seen">Déjà vus</h2>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "1rem",
                                }}>
                                {moviesSeenLinks}
                            </Box>
                        </Box>
                        <Box sx={moviesTypeSx}>
                            <h2 id="liked">J'aime</h2>
                        </Box>
                        <Box>
                            <h2 id="reviews">Mes critiques</h2>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
