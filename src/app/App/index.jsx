import Router from "../Router";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "../../styles/theme";

const styles = {
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
