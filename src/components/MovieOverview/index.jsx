import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieOverview = ({ overview }) => {
    MovieOverview.propTypes = {
        overview: PropTypes.string.isRequired,
    };
    return (
        overview !== null && (
            <Typography paragraph mt="1rem" align="justify">
                {overview}
            </Typography>
        )
    );
};

export default MovieOverview;
