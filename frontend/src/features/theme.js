import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
};

export const themeSetDarkMode = createAction("theme/setDarkMode");

const themeReducer = createReducer(initialState, (builder) => {
    return builder.addCase(themeSetDarkMode, (draft, action) => {
        draft.darkMode = action.payload;
    });
});

export default themeReducer;
