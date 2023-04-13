import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import Router from "./Router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme";
import store from "./utils/store";

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
