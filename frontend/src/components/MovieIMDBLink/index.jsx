import { Link as RouterLink } from "react-router-dom";

import { Typography, Link } from "@mui/material";

import PropTypes from "prop-types";

const MovieIMDBLink = ({ imdbId, imdbLang }) => {
    MovieIMDBLink.propTypes = {
        imdbId: PropTypes.string.isRequired,
        imdbLang: PropTypes.string.isRequired,
    };
    return (
        imdbId !== undefined &&
        imdbId !== null && (
            <Typography paragraph mt="4rem" align="center">
                <Link
                    component={RouterLink}
                    to={`https://www.imdb.com/title/${imdbId}/`}
                    target="_blank"
                    underline="hover">
                    {imdbLang}
                </Link>
            </Typography>
        )
    );
};

export default MovieIMDBLink;
