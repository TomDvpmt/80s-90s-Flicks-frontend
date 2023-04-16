import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            // orange
            main: "#f25921",
        },
        secondary: {
            // yellow
            main: "#feea10",
        },
        tertiary: {
            // brown
            main: "#32231f",
        },
        warning: {
            // red
            main: "#ff0000",
        },
        success: {
            // green
            main: "#00FF00",
        },
    },
    typography: {
        fontFamily: "Roboto, Helvetica Neue, Arial, sans-serif",
        fontSize: 16,
    },

    // Custom properties
    maxWidth: {
        nav: {
            desktop: "1200px",
        },
        main: {
            desktop: "1200px",
        },
        filters: {
            desktop: "700px",
        },
    },
});

export default theme;
