import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    isSignedIn: false,
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    moviesSeen: [],
    moviesToSee: [],
    favorites: [],
    language: "fr",
};

export const userAuth = createAction("user/auth");
export const userSetInfo = createAction("user/setInfo");
export const userSignOut = createAction("user/signOut");
export const userAddToMoviesSeen = createAction("user/addToMoviesSeen");
export const userRemoveFromMoviesSeen = createAction(
    "user/removeFromMoviesSeen"
);
export const userAddToMoviesToSee = createAction("user/addToMoviesToSee");
export const userRemoveFromMoviesToSee = createAction(
    "user/removeFromMoviesToSee"
);
export const userAddToFavorites = createAction("user/addToFavorites");
export const userRemoveFromFavorites = createAction("user/removeFromFavorites");
export const userSetLanguage = createAction("user/setLanguage");

const userReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(userAuth, (draft, action) => {
            draft.isSignedIn = true;
        })
        .addCase(userSetInfo, (draft, action) => {
            const token = sessionStorage.getItem("token");
            draft.isSignedIn = token !== "" && token !== null;
            draft.id = action.payload.id;
            draft.username = action.payload.username;
            draft.firstName = action.payload.firstName;
            draft.lastName = action.payload.lastName;
            draft.email = action.payload.email;
            draft.moviesSeen = action.payload.moviesSeen;
            draft.moviesToSee = action.payload.moviesToSee;
            draft.favorites = action.payload.favorites;
            draft.language = action.payload.language;
        })
        .addCase(userSignOut, (draft, action) => {
            return initialState;
        })
        .addCase(userAddToMoviesSeen, (draft, action) => {
            draft.moviesSeen.push(action.payload);
        })
        .addCase(userRemoveFromMoviesSeen, (draft, action) => {
            draft.moviesSeen = draft.moviesSeen.filter(
                (movieId) => movieId !== action.payload
            );
        })
        .addCase(userAddToMoviesToSee, (draft, action) => {
            draft.moviesToSee.push(action.payload);
        })
        .addCase(userRemoveFromMoviesToSee, (draft, action) => {
            draft.moviesToSee = draft.moviesToSee.filter(
                (movieId) => movieId !== action.payload
            );
        })
        .addCase(userAddToFavorites, (draft, action) => {
            draft.favorites.push(action.payload);
        })
        .addCase(userRemoveFromFavorites, (draft, action) => {
            draft.favorites = draft.favorites.filter(
                (movieId) => movieId !== action.payload
            );
        })
        .addCase(userSetLanguage, (draft, action) => {
            draft.language = action.payload;
        });
});

export default userReducer;
