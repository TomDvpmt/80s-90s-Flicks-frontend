import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
};

const themeReducer = createReducer(initialState, (builder) => {
    return builder;
});

export default themeReducer;
