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
                position: "absolute",
                display: { xs: "none", md: "block" },
                zIndex: "1",
                opacity: path ? ".3" : ".1",
                overflow: "hidden",
                "& img": {
                    maxWidth: "2200px",
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
