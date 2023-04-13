import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    isSignedIn: false,
};

export const userAuth = createAction("user/auth");
export const userSetToken = createAction("user/setToken");
// export const userSetInfo = createAction("user/setInfo");
export const userSignOut = createAction("user/signOut");

const userReducer = createReducer(initialState, (builder) => {
    return (
        builder
            .addCase(userAuth, (draft, action) => {
                draft.isSignedIn = true;
                return;
            })
            .addCase(userSetToken, (draft, action) => {
                draft.token = action.payload;
                return;
            })
            // .addCase(userSetInfo, (draft, action) => {
            //     draft.firstName = action.payload.firstName;
            //     draft.lastName = action.payload.lastName;
            //     return;
            // })
            .addCase(userSignOut, (draft, action) => {
                draft.token = "";
                draft.isSignedIn = false;
                return;
            })
    );
});

export default userReducer;
