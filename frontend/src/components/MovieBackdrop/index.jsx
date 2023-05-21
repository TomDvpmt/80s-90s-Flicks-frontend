import { useSelector } from "react-redux";

import { selectTmdbImagesSecureUrl } from "../../app/selectors";

import defaultBackdrop from "../../assets/img/defaultBackdrop.jpg";

import { Box } from "@mui/material";

import PropTypes from "prop-types";

const MovieBackdrop = ({ path, movieTitle }) => {
    MovieBackdrop.propTypes = {
        path: PropTypes.string,
        movieTitle: PropTypes.string,
    };

    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());

    return (
        <Box
            sx={{
                width: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                gridColumn: "1",
                gridRow: "1",
                display: { xs: "none", md: "block" },
                zIndex: "1",
                opacity: path ? ".2" : ".1",
                overflow: "hidden",
                "& img": {
                    // minHeight: "100%",
                    maxWidth: "1920px",
                    objectFit: "cover",
                },
            }}>
            {
                <img
                    src={
                        path
                            ? `${imageBaseUrl}${"original"}${path}`
                            : defaultBackdrop
                    }
                    alt={movieTitle + "(backdrop)"}
                />
            }
        </Box>
    );
};

export default MovieBackdrop;
