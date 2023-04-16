import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import filtersReducer from "../features/filters";
import themeReducer from "../features/theme";
import tmdbConfigReducer from "../features/tmdbConfig";

const store = configureStore({
    reducer: {
        user: userReducer,
        filters: filtersReducer,
        theme: themeReducer,
        tmdbConfig: tmdbConfigReducer,
    },
    devTools: true,
});

export default store;
