import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
    Card,
    CardMedia,
    CardContent,
    Link,
    Typography,
    Box,
    Divider,
} from "@mui/material";

import PropTypes from "prop-types";
import theme from "../../theme/theme";

const PersonFilmographyCard = ({ movie, type, imgSrc }) => {
    PersonFilmographyCard.propTypes = {
        movie: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
    };

    const navigate = useNavigate();

    const releaseDate = parseInt(movie?.release_date?.slice(0, 4));
    const is80s90s = releaseDate >= 1980 && releaseDate <= 1999;

    const handleCardClick = (e) => {
        e.preventDefault();
        is80s90s && navigate(`/movies/${movie.id}`);
    };

    return (
        <Card
            key={movie.id}
            variant={is80s90s ? "elevation" : "outlined"}
            sx={{
                bgcolor: is80s90s ? "white" : theme.palette.background.default,
                maxWidth: theme.maxWidth.filmography,
                width: "100%",
                ":hover": {
                    boxShadow: is80s90s && 4,
                    cursor: is80s90s && "pointer",
                },
                display: "flex",
                alignItems: "center",
            }}
            onClick={handleCardClick}>
            <CardMedia
                component="img"
                image={imgSrc}
                alt={movie.title}
                sx={{
                    maxHeight: "75px",
                    maxWidth: "50px",
                }}
            />
            <CardContent
                sx={{
                    height: "75px",
                    p: "0",
                    ":last-child": {
                        pb: "0",
                    },
                    flexGrow: "1",
                    display: "flex",
                    alignItems: "center",
                }}>
                <Box
                    sx={{
                        p: "0 1rem",
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <Typography>{movie.title}</Typography>
                    {movie.title !== movie.original_title && (
                        <Typography
                            color={theme.palette.text.faded}
                            sx={{ fontSize: { xs: ".75rem", md: ".9rem" } }}>
                            (<em>{movie.original_title}</em>)
                        </Typography>
                    )}
                </Box>
                <Divider orientation="vertical" flexItem={true} />
                <Box p="0 1rem">
                    <Typography
                        component="span"
                        color={
                            is80s90s
                                ? theme.palette.brandingWarm.main
                                : "initial"
                        }>
                        {releaseDate}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PersonFilmographyCard;
