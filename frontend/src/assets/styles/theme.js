import { alienPalette } from "./palettes";
import { language_fr } from "../languages/fr";
import { language_en } from "../languages/en";

import { createTheme } from "@mui/material/styles";

const languages = {
    fr: language_fr,
    en: language_en,
};

// Intermediate theme in order to use breakpoints and palette inside createTheme, see https://github.com/mui/material-ui/issues/28330
let theme = createTheme({ palette: alienPalette });

theme = createTheme(theme, {
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
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: theme.palette.secondary.light,
                },
            },
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
    favoriteStarColor: "#E17811",
});

export default theme;
