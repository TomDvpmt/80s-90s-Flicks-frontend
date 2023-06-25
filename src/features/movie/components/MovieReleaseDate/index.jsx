import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieReleaseDate = ({ date }) => {
    MovieReleaseDate.propTypes = {
        date: PropTypes.string.isRequired,
    };
    return <Typography component="span">{date.slice(0, 4)}</Typography>;
};

export default MovieReleaseDate;
