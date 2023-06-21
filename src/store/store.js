import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import filtersReducer from "../features/filtersSlice";
import themeReducer from "../features/themeSlice";
import tmdbReducer from "../features/tmdbSlice";
import pageReducer from "../features/pageSlice";
import dialogsReducer from "../features/dialogsSlice";
// import dashboardReducer from "../features/dashboardSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        // dashboard: dashboardReducer,
        page: pageReducer,
        filters: filtersReducer,
        dialogs: dialogsReducer,
        theme: themeReducer,
        tmdb: tmdbReducer,
    },
    devTools: process.env.NODE_ENV === "development",
});

export default store;
