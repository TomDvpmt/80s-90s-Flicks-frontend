import { furyRoadPalette } from "./palettes";
import { language_fr } from "../languages/fr";
import { language_en } from "../languages/en";

import { createTheme } from "@mui/material/styles";

const languages = {
    fr: language_fr,
    en: language_en,
};

// Intermediate theme in order to use breakpoints inside createTheme, see https://github.com/mui/material-ui/issues/28330
let theme = createTheme();

theme = createTheme(theme, {
    palette: furyRoadPalette,
    typography: {
        fontFamily: "Roboto, Helvetica Neue, Arial, sans-serif",
        h1: {
            margin: "3rem 0",
            fontSize: "1.5rem",
            [theme.breakpoints.up("sm")]: {
                fontSize: "3rem",
            },
            textAlign: "center",
        },
        h2: {
            fontSize: "1.5rem",
        },
    },

    // Custom properties

    maxWidth: {
        nav: "1200px",
        main: "1200px",
        filters: "700px",
        userForm: "400px",
    },
    margin: {
        buttonTop: {
            spaced: ".5rem",
            notSpaced: ".8rem",
        },
    },
    languages,
});

export default theme;
