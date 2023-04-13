import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import Router from "./Router";

import store from "./utils/store";

import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Router />
            </ThemeProvider>
        </React.StrictMode>
    </Provider>
);
