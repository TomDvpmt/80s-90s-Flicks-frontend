import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import filtersReducer from "../features/filters";
import themeReducer from "../features/theme";
import tmdbConfigReducer from "../features/tmdbConfig";
import pageReducer from "../features/page";

const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        filters: filtersReducer,
        theme: themeReducer,
        tmdbConfig: tmdbConfigReducer,
    },
    devTools: process.env.NODE_ENV === "development",
});

export default store;
