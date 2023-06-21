import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    backend: {
        isInitialized: false,
    },
    tmdb: {
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
    },
    imgBB: {
        APIKey: "",
    },
};

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setBackendIsInitialized: (state, action) => {
            state.backend.isInitialized = action.payload;
        },
        tmdbSetConfig: (state, action) => {
            state.tmdb = action.payload;
        },
        imgBBSetAPIKey: (state, action) => {
            state.imgBB.APIKey = action.payload;
        },
    },
});

export const { tmdbSetConfig, imgBBSetAPIKey, setBackendIsInitialized } =
    configSlice.actions;

export const selectBackendIsInitialized = (state) =>
    state.config.backend.isInitialized;
export const selectTmdbImagesSecureUrl = (state) =>
    state.config.tmdb.images.secure_base_url;
export const selectTmdbImagesPosterSizes = (state) =>
    state.config.tmdb.images.poster_sizes;
export const selectImgBBAPIKey = (state) => state.config.imgBB.APIKey;

export default configSlice.reducer;
