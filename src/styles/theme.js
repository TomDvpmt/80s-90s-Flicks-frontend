import { COMMON_PALETTE, INDIANA_JONES_PALETTE } from "./palettes";
import sfFedora from "../assets/fonts/SF_Fedora_Shadow.ttf";
import { LANGUAGE_FR } from "../assets/languages/fr";
import { LANGUAGE_EN } from "../assets/languages/en";

import { createTheme } from "@mui/material/styles";

const languages = {
    fr: LANGUAGE_FR,
    en: LANGUAGE_EN,
};

// Intermediate theme in order to use breakpoints and palette inside createTheme, see https://github.com/mui/material-ui/issues/28330
let theme = createTheme({
    palette: { ...COMMON_PALETTE, ...INDIANA_JONES_PALETTE },
});

theme = createTheme(theme, {
    typography: {
        h1: {
            margin: "3rem 0",
            textAlign: "center",
            fontSize: "2rem",
            [theme.breakpoints.up("sm")]: {
                fontSize: "3rem",
            },
        },
        h2: {
            textTransform: "uppercase",
            fontSize: "1.5rem",
            [theme.breakpoints.up("sm")]: {
                fontSize: "2.5rem",
            },
        },
        h3: {
            fontSize: "1.3rem",
            [theme.breakpoints.up("sm")]: {
                fontSize: "2rem",
            },
        },
        h4: {
            fontSize: "1.2rem",
            [theme.breakpoints.up("sm")]: {
                fontSize: "1.7rem",
            },
        },
        body1: {
            [theme.breakpoints.up("xs")]: {
                fontSize: ".8rem",
                lineHeight: "1.2",
            },
            [theme.breakpoints.up("sm")]: {
                fontSize: ".9rem",
                lineHeight: "1.35",
            },
            [theme.breakpoints.up("md")]: {
                fontSize: "1rem",
                lineHeight: "1.5",
            },
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
                font-family: "SfFedora";
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: local("SF_Fedora_Shadow"), url(${sfFedora}) format("truetype");
                unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
            `,
        },
        MuiTypography: {
            defaultProps: {
                fontFamily: "Raleway, Arial",
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: theme.palette.secondary.light,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    backgroundColor: "white",
                    fontFamily: "Raleway, Arial",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: "700",
                },
            },
        },
    },

    // Custom properties

    maxWidth: {
        main: "1200px",
        nav: "1200px",
        filters: "700px",
        filmography: "500px",
        biography: "700px",
        userForm: "500px",
        profileAvatar: "10rem",
        loader: {
            large: "5rem",
            small: "1rem",
        },
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
