import Router from "../../routes/Router";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "../../styles/theme";

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
