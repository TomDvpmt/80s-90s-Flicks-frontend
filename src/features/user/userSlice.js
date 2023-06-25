import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: {
        token: "",
        demoUserId: "",
    },
    data: {
        id: "",
        avatarUrl: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        moviesSeen: [],
        moviesToSee: [],
        favorites: [],
        language: "fr",
    },
    dialogs: {
        showLoggedOnlyDialog: false,
        showLoginDialog: false,
        showRegisterDialog: false,
        showDeleteAccountDialog: false,
        showAvatarUpdateDialog: false,
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // auth
        setToken: (state, action) => {
            state.auth.token = action.payload;
        },
        setDemoUserId: (state, action) => {
            state.auth.demoUserId = action.payload;
        },

        // data
        setUserInfo: (state, action) => {
            state.data.id = action.payload.id || state.data.id;
            state.data.avatarUrl =
                action.payload.avatarUrl || state.data.avatarUrl;
            state.data.username =
                action.payload.username || state.data.username;
            state.data.firstName = action.payload.firstName;
            state.data.lastName = action.payload.lastName;
            state.data.email = action.payload.email || state.data.email;
            state.data.moviesSeen =
                action.payload.moviesSeen || state.data.moviesSeen;
            state.data.moviesToSee =
                action.payload.moviesToSee || state.data.moviesToSee;
            state.data.favorites =
                action.payload.favorites || state.data.favorites;
            state.data.language =
                action.payload.language || state.data.language;
        },
        signOut: (state, action) => initialState,
        updateAvatar: (state, action) => {
            state.data.avatarUrl = action.payload.avatarUrl;
        },
        addToMoviesSeen: (state, action) => {
            state.data.moviesSeen.push(action.payload);
        },
        removeFromMoviesSeen: (state, action) => {
            state.data.moviesSeen = state.data.moviesSeen.filter(
                (movieId) => movieId !== action.payload
            );
        },
        addToMoviesToSee: (state, action) => {
            state.data.moviesToSee.push(action.payload);
        },
        removeFromMoviesToSee: (state, action) => {
            state.data.moviesToSee = state.data.moviesToSee.filter(
                (movieId) => movieId !== action.payload
            );
        },
        addToFavorites: (state, action) => {
            state.data.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.data.favorites = state.data.favorites.filter(
                (movieId) => movieId !== action.payload
            );
        },
        setLanguage: (state, action) => {
            state.data.language = action.payload;
        },

        // dialogs
        setShowLoggedOnlyDialog: (state, action) => {
            state.dialogs.showLoggedOnlyDialog = action.payload;
        },
        setShowLoginDialog: (state, action) => {
            state.dialogs.showLoginDialog = action.payload;
        },
        setShowRegisterDialog: (state, action) => {
            state.dialogs.showRegisterDialog = action.payload;
        },
        setShowDeleteAccountDialog: (state, action) => {
            state.dialogs.showDeleteAccountDialog = action.payload;
        },
        setShowAvatarUpdateDialog: (state, action) => {
            state.dialogs.showAvatarUpdateDialog = action.payload;
        },
    },
});

export const {
    setToken,
    setDemoUserId,
    setUserInfo,
    signOut,
    updateAvatar,
    addToMoviesSeen,
    removeFromMoviesSeen,
    addToMoviesToSee,
    removeFromMoviesToSee,
    addToFavorites,
    removeFromFavorites,
    setLanguage,
    setShowLoginDialog,
    setShowRegisterDialog,
    setShowLoggedOnlyDialog,
    setShowDeleteAccountDialog,
    setShowAvatarUpdateDialog,
} = userSlice.actions;

export const selectToken = (state) => state.user.auth.token;
export const selectDemoUserId = (state) => state.user.auth.demoUserId;
export const selectUserId = (state) => state.user.data.id;
export const selectUserAvatarUrl = (state) => state.user.data.avatarUrl;
export const selectUserUsername = (state) => state.user.data.username;
export const selectUserFirstName = (state) => state.user.data.firstName;
export const selectUserLastName = (state) => state.user.data.lastName;
export const selectUserEmail = (state) => state.user.data.email;
export const selectUserMoviesSeen = (state) => state.user.data.moviesSeen;
export const selectUserMoviesToSee = (state) => state.user.data.moviesToSee;
export const selectUserFavorites = (state) => state.user.data.favorites;
export const selectUserLanguage = (state) => state.user.data.language;
export const selectShowLoggedOnlyDialog = (state) =>
    state.user.dialogs.showLoggedOnlyDialog;
export const selectShowLoginDialog = (state) =>
    state.user.dialogs.showLoginDialog;
export const selectShowRegisterDialog = (state) =>
    state.user.dialogs.showRegisterDialog;
export const selectShowDeleteAccountDialog = (state) =>
    state.user.dialogs.showDeleteAccountDialog;
export const selectShowAvatarUpdateDialog = (state) =>
    state.user.dialogs.showAvatarUpdateDialog;

export default userSlice.reducer;
