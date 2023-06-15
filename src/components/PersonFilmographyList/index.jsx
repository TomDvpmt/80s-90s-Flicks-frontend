import { Box, Typography } from "@mui/material";

import theme from "../../assets/styles/theme";

import PropTypes from "prop-types";

const PersonFilmographyList = ({ personGender, movies, type }) => {
    PersonFilmographyList.propTypes = {
        personGender: PropTypes.number.isRequired,
        movies: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired,
    };
    return (
        <>
            {movies.length > 0 && (
                <Box
                    sx={{
                        maxWidth: theme.maxWidth.filmography,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <Typography component="h3" variant="h3" mb="1rem">
                        {type === "directing"
                            ? personGender === 1
                                ? "Réalisatrice"
                                : "Réalisateur"
                            : type === "acting"
                            ? personGender === 1
                                ? "Actrice"
                                : "Acteur"
                            : "Scénariste"}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: ".5rem",
                        }}>
                        {movies}
                    </Box>
                </Box>
            )}
        </>
    );
};

export default PersonFilmographyList;
