import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    isSignedIn: false,
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
};

export const userAuth = createAction("user/auth");
export const userSetToken = createAction("user/setToken");
export const userSetInfo = createAction("user/setInfo");
export const userSignOut = createAction("user/signOut");

const userReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(userAuth, (draft, action) => {
            draft.isSignedIn = true;
            return;
        })
        .addCase(userSetToken, (draft, action) => {
            draft.token = action.payload;
            return;
        })
        .addCase(userSetInfo, (draft, action) => {
            draft.id = action.payload.id;
            draft.username = action.payload.username;
            draft.firstName = action.payload.firstName;
            draft.lastName = action.payload.lastName;
            draft.email = action.payload.email;
            return;
        })
        .addCase(userSignOut, (draft, action) => {
            draft.token = "";
            draft.isSignedIn = false;
            draft.id = "";
            draft.username = "";
            draft.firstName = "";
            draft.lastName = "";
            draft.email = "";
            return;
        });
});

export default userReducer;
