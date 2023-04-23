import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieTagline = ({ tagline }) => {
    MovieTagline.propTypes = {
        tagline: PropTypes.string.isRequired,
    };
    return (
        tagline !== null && (
            <Typography paragraph fontWeight="700">
                {tagline}
            </Typography>
        )
    );
};

export default MovieTagline;
