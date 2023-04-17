import { furyRoadPalette } from "./palettes";
import { language_fr } from "../languages/fr";
import { language_en } from "../languages/en";

import { createTheme } from "@mui/material/styles";

const languages = {
    fr: language_fr,
    en: language_en,
};

const theme = createTheme({
    palette: furyRoadPalette,
    typography: {
        fontFamily: "Roboto, Helvetica Neue, Arial, sans-serif",
        fontSize: 16,
        h1: {
            margin: "3rem 0",
            fontSize: "3rem",
            textAlign: "center",
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
