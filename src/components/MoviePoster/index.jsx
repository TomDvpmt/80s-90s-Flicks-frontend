import { useState } from "react";
import { useSelector } from "react-redux";

import {
    selectTmdbImagesPosterSizes,
    selectTmdbImagesSecureUrl,
} from "../../features/tmdbSlice";
import { selectPageLocation } from "../../features/pageSlice";

import defaultPoster from "../../assets/img/defaultPoster.jpeg";

import Loader from "../Loader";

import { Box } from "@mui/material";
import theme from "../../assets/styles/theme";

import PropTypes from "prop-types";

const MoviePoster = ({ path, movieTitle }) => {
    MoviePoster.propTypes = {
        path: PropTypes.string,
        movieTitle: PropTypes.string,
    };

    const page = useSelector(selectPageLocation);
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl);
    const posterSizes = useSelector(selectTmdbImagesPosterSizes);

    const [isLoading, setIsLoading] = useState(true);

    let posterSize = "";
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

    const hasPoster = path !== null && path !== "";
    const imgSrc = hasPoster
        ? `${imageBaseUrl}${posterSize}${path}`
        : defaultPoster;

    return (
        <>
            {posterSizes[4] && (
                <Box
                    sx={{
                        gridColumn: "1",
                        gridRow: "1",
                        display: { xs: path ? "flex" : "none", md: "flex" },
                        justifyContent: "center",
                        "& .poster": {
                            display: isLoading ? "none" : "block",
                            minWidth: {
                                xs: "100%",
                                md: `${posterSizes[4].slice(1)}px`,
                            },
                            maxWidth: "100%",
                            borderRadius: { md: "5px" },
                            boxShadow: {
                                xs: "none",
                                md: `0 0 8px 2px ${theme.palette.background.darker}`,
                            },
                        },
                        "& .loader": {
                            display: isLoading ? "block" : "none",
                        },
                    }}>
                    <img
                        className="poster"
                        src={imgSrc}
                        alt={movieTitle + "(poster)"}
                        onLoad={() => setIsLoading(false)}
                    />
                    <Loader />
                </Box>
            )}
        </>
    );
};

export default MoviePoster;
