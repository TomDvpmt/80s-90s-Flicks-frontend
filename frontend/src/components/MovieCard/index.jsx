import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import AddToFavorites from "../AddToFavorites";

import {
    selectUserLanguage,
    selectTmdbImagesSecureUrl,
    selectTmdbImagesPosterSizes,
    selectPageLocation,
} from "../../services/utils/selectors";

import { setCastAndCrew } from "../../utils/movie";

import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from "@mui/material";

import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../../assets/styles/theme";

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
            opacity: 0.2;
        }
    }
`;

const MovieCard = ({ page, movie }) => {
    MovieCard.propTypes = {
        page: PropTypes.string.isRequired,
        movie: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage());
    const currentLocation = useSelector(selectPageLocation());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());
    const posterSizes = useSelector(selectTmdbImagesPosterSizes());

    const [director, setDirector] = useState("");
    const [actors, setActors] = useState([""]);

    useEffect(() => {
        setCastAndCrew(page, movie.id, setDirector, setActors);
    }, [page, movie.id]);

    return (
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <Link to={`/movies/${movie.id}`}>
                <Card
                    component="article"
                    sx={{
                        position: "relative",
                        maxWidth: page === "home" ? "300px" : "inherit",
                        margin: "auto",
                    }}
                    className="card">
                    <StyledCardContainer>
                        {currentLocation === "home" && (
                            <AddToFavorites movieId={movie.id} />
                        )}
                        <CardContent
                            className="movieInfo"
                            sx={{
                                position: "absolute",
                                zIndex: "99",
                                "& *": {
                                    color: "white",
                                },
                            }}>
                            <Typography
                                component="h3"
                                variant="h5"
                                sx={{
                                    margin: "4rem 0 2rem",
                                    textAlign: "center",
                                }}>
                                {movie.title}
                            </Typography>
                            {movie.title !== movie.originalTitle && (
                                <Typography
                                    paragraph
                                    sx={{ fontStyle: "italic" }}>
                                    {movie.originalTitle}
                                </Typography>
                            )}
                            <Box mb="1rem">
                                {director}
                                {movie.releaseDate && (
                                    <Typography component="span" ml={1}>
                                        ({movie.releaseDate.slice(0, 4)})
                                    </Typography>
                                )}
                            </Box>
                            {actors[0] && (
                                <Typography>
                                    {
                                        theme.languages[language].components
                                            .movieCard.actorsWith
                                    }{" "}
                                    {actors}
                                </Typography>
                            )}
                        </CardContent>
                        <CardMedia
                            image={`${imageBaseUrl}${
                                page === "home"
                                    ? posterSizes[3]
                                    : posterSizes[2]
                            }${movie.posterPath}`}
                            component="img"
                            alt={movie.title}
                        />
                    </StyledCardContainer>
                </Card>
            </Link>
        </Grid>
    );
};

export default MovieCard;
