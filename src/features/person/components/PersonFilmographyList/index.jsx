import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../../user/userSlice";

import theme from "../../../../theme/theme";
import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

const PersonFilmographyList = ({ personGender, movies, type }) => {
    PersonFilmographyList.propTypes = {
        personGender: PropTypes.number.isRequired,
        movies: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired,
    };

    const language = useSelector(selectUserLanguage);

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
                                ? theme.languages[language].pages.person
                                      .director.female
                                : theme.languages[language].pages.person
                                      .director.male
                            : type === "acting"
                            ? personGender === 1
                                ? theme.languages[language].pages.person.actor
                                      .female
                                : theme.languages[language].pages.person.actor
                                      .male
                            : theme.languages[language].pages.person.writer}
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
