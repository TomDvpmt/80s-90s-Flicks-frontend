import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieHeading = ({ title, originalTitle }) => {
    MovieHeading.propTypes = {
        title: PropTypes.string,
        originalTitle: PropTypes.string,
    };
    return (
        <>
            <Typography
                component="h1"
                variant="h1"
                align="center"
                sx={{ fontWeight: "700" }}>
                {title}
            </Typography>
            <Typography paragraph align="center" sx={{ fontStyle: "italic" }}>
                {title !== originalTitle && `(${originalTitle})`}
            </Typography>
        </>
    );
};

export default MovieHeading;
