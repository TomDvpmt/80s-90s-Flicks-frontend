import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ToggleFavorite from "../ToggleFavorite";
import MovieHeading from "../MovieHeading";
import MovieCastAndCrew from "../MovieCastAndCrew";

import {
    selectTmdbImagesSecureUrl,
    selectTmdbImagesPosterSizes,
    selectPageLocation,
} from "../../services/utils/selectors";

import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

import styled from "styled-components";
import PropTypes from "prop-types";

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

    const currentLocation = useSelector(selectPageLocation());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());
    const posterSizes = useSelector(selectTmdbImagesPosterSizes());

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
                            <ToggleFavorite movieId={movie.id} />
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
                            <MovieHeading
                                title={movie.title}
                                originalTitle={movie.original_title}
                            />
                            <MovieCastAndCrew
                                movieId={movie.id}
                                releaseDate={movie.releaseDate}
                            />
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
