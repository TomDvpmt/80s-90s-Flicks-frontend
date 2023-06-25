import Router from "../Router";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "../../theme/theme";

const styles = {
    "#root": {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    a: {
        textDecoration: "none",
    },
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={styles} />
            <Router />
        </ThemeProvider>
    );
};

export default App;
