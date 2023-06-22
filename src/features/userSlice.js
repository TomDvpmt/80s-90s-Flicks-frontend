import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
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
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        auth: (state, action) => {
            state.token = action.payload;
        },
        setUserInfo: (state, action) => {
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.avatarUrl = action.payload.avatarUrl;
            state.username = action.payload.username;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.moviesSeen = action.payload.moviesSeen;
            state.moviesToSee = action.payload.moviesToSee;
            state.favorites = action.payload.favorites;
            state.language = action.payload.language;
        },
        signOut: (state, action) => initialState,
        updateAvatar: (state, action) => {
            state.avatarUrl = action.payload.avatarUrl;
        },
        addToMoviesSeen: (state, action) => {
            state.moviesSeen.push(action.payload);
        },
        removeFromMoviesSeen: (state, action) => {
            state.moviesSeen = state.moviesSeen.filter(
                (movieId) => movieId !== action.payload
            );
        },
        addToMoviesToSee: (state, action) => {
            state.moviesToSee.push(action.payload);
        },
        removeFromMoviesToSee: (state, action) => {
            state.moviesToSee = state.moviesToSee.filter(
                (movieId) => movieId !== action.payload
            );
        },
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(
                (movieId) => movieId !== action.payload
            );
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
});

export const {
    auth,
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
} = userSlice.actions;

export const selectUserIsSignedIn = (state) => state.user.isSignedIn;
export const selectUserToken = (state) => state.user.token;
export const selectUserId = (state) => state.user.id;
export const selectUserAvatarUrl = (state) => state.user.avatarUrl;
export const selectUserUsername = (state) => state.user.username;
export const selectUserFirstName = (state) => state.user.firstName;
export const selectUserLastName = (state) => state.user.lastName;
export const selectUserEmail = (state) => state.user.email;
export const selectUserMoviesSeen = (state) => state.user.moviesSeen;
export const selectUserMoviesToSee = (state) => state.user.moviesToSee;
export const selectUserFavorites = (state) => state.user.favorites;
export const selectUserLanguage = (state) => state.user.language;

export default userSlice.reducer;
