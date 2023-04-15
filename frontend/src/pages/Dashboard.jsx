import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link, NavLink } from "react-router-dom";

import { setUserInfo, getMovieData } from "../utils/requests";
import {
    selectUserInfo,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../services/utils/selectors";

import {
    Stack,
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";

import styled from "styled-components";

const StyledCardContainer = styled.div`
    background-color: black;

    img {
        transition: opacity ease 150ms;
    }
    .movieInfo {
        display: none;

        span {
            color: white;
        }
    }

    &:hover {
        .movieInfo {
            display: block;
        }

        img {
            opacity: 0.3;
        }
    }
`;

const moviesTypeSx = {
    border: "1px solid black",
    padding: "1rem",
    "& h2": {
        mb: "1rem",
    },
};

const Dashboard = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);

    const user = useSelector(selectUserInfo());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const moviesToSee = useSelector(selectUserMoviesToSee());

    const [uniqueMovies, setUniqueMovies] = useState([]);

    const [moviesSeenLinks, setMoviesSeenLinks] = useState([]);
    const [moviesToSeeLinks, setMoviesToSeeLinks] = useState([]);

    // Get all movies data from MoviesSeen, MoviesToSee, MoviesLiked, without duplicates
    useEffect(() => {
        const allMoviesIds = user.moviesSeen.concat(user.moviesToSee);
        Promise.all(
            allMoviesIds.map(async (id) => {
                return getMovieData(id)
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
    }, [user]);

    // Display movie links for each section of the dashboard
    useEffect(() => {
        const getLinks = (uniqueMovies, moviesType) =>
            uniqueMovies
                .filter((movie) => moviesType.includes(`${movie.id}`))
                .map((movie) => {
                    return (
                        <Link key={movie.id} to={`/movies/${movie.id}`}>
                            <Card
                                component="article"
                                sx={{
                                    position: "relative",
                                    maxWidth: "200px",
                                }}
                                className="card">
                                <StyledCardContainer>
                                    <CardContent
                                        className="movieInfo"
                                        sx={{
                                            position: "absolute",
                                            zIndex: "99",
                                        }}>
                                        <Typography component="span">
                                            {movie.title}
                                            {movie.releaseDate &&
                                                ` (${movie.releaseDate.slice(
                                                    0,
                                                    4
                                                )})`}
                                        </Typography>
                                    </CardContent>
                                    <CardMedia
                                        image={
                                            "https://image.tmdb.org/t/p/w300" +
                                            movie.posterPath
                                        }
                                        component="img"
                                        alt={movie.title}
                                        sx={{
                                            objectFit: "cover",
                                        }}
                                    />
                                </StyledCardContainer>
                            </Card>
                        </Link>
                    );
                });

        setMoviesSeenLinks(getLinks(uniqueMovies, moviesSeen));
        setMoviesToSeeLinks(getLinks(uniqueMovies, moviesToSee));
    }, [uniqueMovies, moviesSeen, moviesToSee]);

    return (
        <>
            <Box component="main">
                <Typography component="h1" variant="h4">
                    Dashboard
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
                            <NavLink to="/dashboard/#toSee">To See</NavLink>

                            <NavLink to="/dashboard/#seen">
                                Already Seen
                            </NavLink>

                            <NavLink to="/dashboard/#liked">Liked</NavLink>

                            <NavLink to="/dashboard/#reviews">
                                My Reviews
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
