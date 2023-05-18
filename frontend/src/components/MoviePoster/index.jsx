import { useSelector } from "react-redux";

import {
    selectTmdbImagesSecureUrl,
    selectTmdbImagesPosterSizes,
    selectPageLocation,
} from "../../app/selectors";

import defaultPoster from "../../assets/img/defaultPoster.jpeg";

import { Box } from "@mui/material";

import PropTypes from "prop-types";

const MoviePoster = ({ path, movieTitle }) => {
    MoviePoster.propTypes = {
        path: PropTypes.string.isRequired,
        movieTitle: PropTypes.string,
    };

    const page = useSelector(selectPageLocation());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());
    const posterSizes = useSelector(selectTmdbImagesPosterSizes());

    let posterSize;
    switch (page) {
        case "home":
            posterSize = posterSizes[3];
            break;
        case "movie":
            posterSize = posterSizes[5];
            break;
        default:
            posterSize = posterSizes[2];
    }

    console.log(posterSize.slice(1));

    const hasPoster = path !== null && path !== "";
    const imgSrc = hasPoster
        ? `${imageBaseUrl}${posterSize}${path}`
        : defaultPoster;

    return (
        <Box
            sx={{
                gridColumn: "1",
                gridRow: "1",
                "& .poster": {
                    minWidth: {
                        xs: "100%",
                        md: `${posterSizes[4].slice(1)}px`,
                    },
                    maxWidth: `${posterSizes[4].slice(1)}px`,
                },
            }}>
            <img
                className="poster"
                src={imgSrc}
                alt={movieTitle + "(poster)"}
            />
        </Box>
    );
};

export default MoviePoster;
