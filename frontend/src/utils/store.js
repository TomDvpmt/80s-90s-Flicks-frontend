import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import pageReducer from "../features/page";
import filtersReducer from "../features/filters";

const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        filters: filtersReducer,
    },
    devTools: true,
});

export default store;
