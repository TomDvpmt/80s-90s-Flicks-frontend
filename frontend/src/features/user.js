import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    isSignedIn: false,
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    moviesSeen: [],
};

export const userAuth = createAction("user/auth");
export const userSetInfo = createAction("user/setInfo");
export const userSignOut = createAction("user/signOut");
export const userAddToMoviesSeen = createAction("user/addToMoviesSeen");
export const userRemoveFromMoviesSeen = createAction(
    "user/removeFromMoviesSeen"
);

const userReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(userAuth, (draft, action) => {
            draft.isSignedIn = true;
        })
        .addCase(userSetInfo, (draft, action) => {
            draft.isSignedIn = true;
            draft.id = action.payload.id;
            draft.username = action.payload.username;
            draft.firstName = action.payload.firstName;
            draft.lastName = action.payload.lastName;
            draft.email = action.payload.email;
            draft.moviesSeen = action.payload.moviesSeen;
        })
        .addCase(userSignOut, (draft, action) => {
            draft.isSignedIn = false;
            draft.id = "";
            draft.username = "";
            draft.firstName = "";
            draft.lastName = "";
            draft.email = "";
        })
        .addCase(userAddToMoviesSeen, (draft, action) => {
            draft.moviesSeen.push(action.payload);
        })
        .addCase(userRemoveFromMoviesSeen, (draft, action) => {
            draft.moviesSeen = draft.moviesSeen.filter(
                (movieId) => movieId !== action.payload
            );
        });
});

export default userReducer;
