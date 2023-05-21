import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieTagline = ({ tagline }) => {
    MovieTagline.propTypes = {
        tagline: PropTypes.string.isRequired,
    };
    return (
        tagline !== null && (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                <Typography
                    paragraph
                    variant="h3"
                    maxWidth="500px"
                    mb="4rem"
                    fontStyle="italic">
                    {tagline}
                </Typography>
            </Box>
        )
    );
};

export default MovieTagline;
