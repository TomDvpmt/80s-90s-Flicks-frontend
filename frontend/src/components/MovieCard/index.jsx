import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ToggleFavorite from "../ToggleFavorite";
import MovieHeading from "../MovieHeading";
import MovieCastAndCrew from "../MovieCastAndCrew";

import defaultPoster from "../../assets/img/defaultPoster.jpeg";

import {
    selectTmdbImagesSecureUrl,
    selectTmdbImagesPosterSizes,
    selectUserFavorites,
} from "../../app/selectors";

import theme from "../../assets/styles/theme";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
} from "@mui/material";
import { Star } from "@mui/icons-material";

import PropTypes from "prop-types";

const MovieCard = ({ page, movie }) => {
    MovieCard.propTypes = {
        page: PropTypes.string.isRequired,
        movie: PropTypes.object.isRequired,
    };

    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());
    const posterSizes = useSelector(selectTmdbImagesPosterSizes());
    const favorites = useSelector(selectUserFavorites());

    const isFavorite = favorites.includes(movie.id);

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
            <Card
                component="article"
                sx={{
                    // position: "relative",
                    maxWidth: cardMaxWidth,
                    margin: "auto",
                }}
                className="card">
                <CardActionArea
                    component={Link}
                    to={`/movies/${movie.id}`}
                    sx={{
                        position: "relative",
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
                    {page === "home" && isFavorite && (
                        <Star
                            sx={{
                                position: "absolute",
                                zIndex: "3",
                                m: ".5rem",
                                color: theme.palette.brandingWarm.main,
                            }}
                        />
                    )}
                    <CardContent
                        className="movieInfo"
                        sx={{
                            display: hasPoster ? "none" : "block",
                            position: "absolute",
                            zIndex: "2",
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
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default MovieCard;
