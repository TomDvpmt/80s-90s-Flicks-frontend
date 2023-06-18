import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
        },
    },
});

export const { setDarkMode } = themeSlice.actions;

export const selectThemeMode = (state) => state.theme.darkMode;

export default themeSlice.reducer;
