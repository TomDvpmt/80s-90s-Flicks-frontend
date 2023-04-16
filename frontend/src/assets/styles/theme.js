import { createTheme } from "@mui/material/styles";

import { furyRoadPalette } from "./palettes";

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
