import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showLoginDialog: false,
    showRegisterDialog: false,
    showLoggedOnlyDialog: false,
    showSearchMovieDialog: false,
};

export const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        setShowLoginDialog: (state, action) => {
            state.showLoginDialog = action.payload;
        },
        setShowRegisterDialog: (state, action) => {
            state.showRegisterDialog = action.payload;
        },
        setShowLoggedOnlyDialog: (state, action) => {
            state.showLoggedOnlyDialog = action.payload;
        },
        setShowSearchMovieDialog: (state, action) => {
            state.showSearchMovieDialog = action.payload;
        },
    },
});

export const {
    setShowLoginDialog,
    setShowRegisterDialog,
    setShowLoggedOnlyDialog,
    setShowSearchMovieDialog,
} = dialogsSlice.actions;

export const selectShowLoginDialog = (state) => state.dialogs.showLoginDialog;
export const selectShowRegisterDialog = (state) =>
    state.dialogs.showRegisterDialog;
export const selectShowLoggedOnlyDialog = (state) =>
    state.dialogs.showLoggedOnlyDialog;
export const selectShowSearchMovieDialog = (state) =>
    state.dialogs.showSearchMovieDialog;

export default dialogsSlice.reducer;
