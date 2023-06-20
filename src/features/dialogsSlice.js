import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showLoggedOnlyDialog: false,
    showLoginDialog: false,
    showRegisterDialog: false,
    showSearchMovieDialog: false,
    showDeleteAccountDialog: false,
    showUserAvatarUpdateDialog: false,
};

export const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        setShowLoggedOnlyDialog: (state, action) => {
            state.showLoggedOnlyDialog = action.payload;
        },
        setShowLoginDialog: (state, action) => {
            state.showLoginDialog = action.payload;
        },
        setShowRegisterDialog: (state, action) => {
            state.showRegisterDialog = action.payload;
        },
        setShowSearchMovieDialog: (state, action) => {
            state.showSearchMovieDialog = action.payload;
        },
        setShowDeleteAccountDialog: (state, action) => {
            state.showDeleteAccountDialog = action.payload;
        },
        setShowUserAvatarUpdateDialog: (state, action) => {
            state.showUserAvatarUpdateDialog = action.payload;
        },
    },
});

export const {
    setShowLoginDialog,
    setShowRegisterDialog,
    setShowLoggedOnlyDialog,
    setShowSearchMovieDialog,
    setShowDeleteAccountDialog,
    setShowUserAvatarUpdateDialog,
} = dialogsSlice.actions;

export const selectShowLoggedOnlyDialog = (state) =>
    state.dialogs.showLoggedOnlyDialog;
export const selectShowLoginDialog = (state) => state.dialogs.showLoginDialog;
export const selectShowRegisterDialog = (state) =>
    state.dialogs.showRegisterDialog;
export const selectShowSearchMovieDialog = (state) =>
    state.dialogs.showSearchMovieDialog;
export const selectShowDeleteAccountDialog = (state) =>
    state.dialogs.showDeleteAccountDialog;
export const selectShowUserAvatarUpdateDialog = (state) =>
    state.dialogs.showUserAvatarUpdateDialog;

export default dialogsSlice.reducer;
