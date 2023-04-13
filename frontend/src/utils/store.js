import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import pageReducer from "../features/page";

const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
    },
    devTools: true,
});

export default store;
