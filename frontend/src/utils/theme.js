import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#f25921",
        },
        secondary: {
            main: "#feea10",
        },
        tertiary: {
            main: "#32231f",
        },
        validation: {
            main: "green",
        },
    },
    typography: {
        fontFamily: "Roboto, Helvetica Neue, Arial, sans-serif",
        fontSize: 16,
    },

    // Custom properties
    maxWidth: {
        desktop: 1200,
    },
});
