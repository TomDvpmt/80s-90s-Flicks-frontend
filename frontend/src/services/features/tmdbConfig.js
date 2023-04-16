import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    change_keys: [],
    images: {
        backdrop_sizes: [],
        base_url: "",
        logo_sizes: [],
        poster_sizes: [],
        profile_sizes: [],
        secure_base_url: "",
        stille_sizes: [],
    },
};

export const tmdbSetConfig = createAction("tmdb");

const tmdbConfigReducer = createReducer(initialState, (builder) => {
    return builder.addCase(tmdbSetConfig, (draft, action) => {
        return action.payload;
    });
});

export default tmdbConfigReducer;
