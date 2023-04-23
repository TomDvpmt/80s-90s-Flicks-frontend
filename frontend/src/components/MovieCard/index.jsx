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

import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";

import defaultPoster from "../../assets/img/defaultPoster.jpeg";

import PropTypes from "prop-types";

const MovieCard = ({ page, movie }) => {
    MovieCard.propTypes = {
        page: PropTypes.string.isRequired,
        movie: PropTypes.object.isRequired,
    };

    const currentLocation = useSelector(selectPageLocation());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());
    const posterSizes = useSelector(selectTmdbImagesPosterSizes());

    const posterSize = posterSizes[3];
    const cardMaxWidth = posterSize.includes("w")
        ? posterSize.split("").splice(1).join("") + "px"
        : "auto";

    const hasPoster = movie.posterPath !== null && movie.posterPath !== "";
    const imgSrc = hasPoster
        ? `${imageBaseUrl}${posterSize}${movie.posterPath}`
        : defaultPoster;

    return (
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <Link to={`/movies/${movie.id}`}>
                <Card
                    component="article"
                    sx={{
                        position: "relative",
                        maxWidth: cardMaxWidth,
                        margin: "auto",
                    }}
                    className="card">
                    <Box
                        sx={{
                            backgroundColor: "black",
                            "&:hover": {
                                "& .movieInfo": {
                                    display: "block",
                                },
                                img: {
                                    opacity: "0.2",
                                },
                            },
                        }}>
                        {currentLocation === "home" && (
                            <ToggleFavorite movieId={movie.id} />
                        )}
                        <CardContent
                            className="movieInfo"
                            sx={{
                                display: hasPoster ? "none" : "block",
                                position: "absolute",
                                zIndex: "99",
                                "& *": {
                                    color: "white",
                                },
                            }}>
                            <MovieHeading
                                title={movie.title}
                                originalTitle={movie.originalTitle}
                            />
                            <MovieCastAndCrew
                                movieId={movie.id}
                                releaseDate={movie.releaseDate}
                            />
                        </CardContent>
                        <CardMedia
                            image={imgSrc}
                            component="img"
                            alt={movie.title}
                            sx={{
                                opacity: hasPoster ? "1" : "0.2",
                                transition: "opacity ease 150ms",
                            }}
                        />
                    </Box>
                </Card>
            </Link>
        </Grid>
    );
};

export default MovieCard;
