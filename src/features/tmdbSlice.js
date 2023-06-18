import { createSlice } from "@reduxjs/toolkit";

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

export const tmdbSlice = createSlice({
    name: "tmdb",
    initialState,
    reducers: {
        tmdbSetConfig: (state, action) => action.payload,
    },
});

export const { tmdbSetConfig } = tmdbSlice.actions;

export const selectTmdbImagesSecureUrl = (state) =>
    state.tmdb.images.secure_base_url;
export const selectTmdbImagesPosterSizes = (state) =>
    state.tmdb.images.poster_sizes;

export default tmdbSlice.reducer;
