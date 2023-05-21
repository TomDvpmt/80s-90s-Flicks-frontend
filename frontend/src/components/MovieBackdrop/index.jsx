import { useSelector } from "react-redux";

import { selectTmdbImagesSecureUrl } from "../../app/selectors";

import { Box } from "@mui/material";

import PropTypes from "prop-types";

const MovieBackdrop = ({ path, movieTitle }) => {
    MovieBackdrop.propTypes = {
        path: PropTypes.string.isRequired,
        movieTitle: PropTypes.string,
    };

    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());

    return (
        path !== null &&
        path !== "" && (
            <Box
                sx={{
                    gridColumn: "1",
                    gridRow: "1",
                    display: { xs: "none", md: "block" },
                    zIndex: "1",
                    opacity: ".2",
                    overflow: "hidden",
                    "& img": {
                        minHeight: "100%",
                        maxWidth: "1920px",
                        objectFit: "cover",
                    },
                }}>
                {
                    <img
                        src={`${imageBaseUrl}${"original"}${path}`}
                        alt={movieTitle + "(backdrop)"}
                    />
                }
            </Box>
        )
    );
};

export default MovieBackdrop;
