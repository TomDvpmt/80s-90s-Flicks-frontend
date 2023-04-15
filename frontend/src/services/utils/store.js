import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import filtersReducer from "../features/filters";
import themeReducer from "../features/theme";

const store = configureStore({
    reducer: {
        user: userReducer,
        filters: filtersReducer,
        theme: themeReducer,
    },
    devTools: true,
});

export default store;
