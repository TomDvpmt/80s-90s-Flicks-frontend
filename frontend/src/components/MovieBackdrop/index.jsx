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
                maxWidth="100%"
                sx={{
                    gridColumn: "1",
                    gridRow: "1",
                    display: { xs: "none", md: "block" },
                    zIndex: "1",
                    opacity: ".15",
                }}>
                {
                    <img
                        src={`${imageBaseUrl}${"original"}${path}`}
                        alt={movieTitle + "(backdrop)"}
                        width="100%"
                    />
                }
            </Box>
        )
    );
};

export default MovieBackdrop;
