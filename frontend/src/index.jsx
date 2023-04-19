import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import Router from "./Router";

import store from "./services/utils/store";

import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./assets/styles/theme";

const styles = {
    a: { textDecoration: "none" },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles styles={styles} />
                <Router />
            </ThemeProvider>
        </React.StrictMode>
    </Provider>
);
