import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user";
import filtersReducer from "../features/filters";

import themeReducer from "../features/themeSlice";
import tmdbReducer from "../features/tmdbSlice";
import pageReducer from "../features/pageSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        filters: filtersReducer,
        theme: themeReducer,
        tmdb: tmdbReducer,
    },
    devTools: process.env.NODE_ENV === "development",
});

export default store;
