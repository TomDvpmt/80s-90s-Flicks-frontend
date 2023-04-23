import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieIMDBLink = ({ imdbId, imdbLang }) => {
    MovieIMDBLink.propTypes = {
        imdbId: PropTypes.string.isRequired,
        imdbLang: PropTypes.string.isRequired,
    };
    return (
        imdbId !== undefined && (
            <Typography paragraph>
                <Link
                    to={`https://www.imdb.com/title/${imdbId}/`}
                    target="_blank">
                    {imdbLang}
                </Link>
            </Typography>
        )
    );
};

export default MovieIMDBLink;
