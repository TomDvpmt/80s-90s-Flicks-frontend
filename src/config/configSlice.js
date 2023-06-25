import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    demoUser: {
        id: "",
    },
};

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        tmdbSetConfig: (state, action) => {
            state.tmdb = action.payload;
        },
        imgBBSetAPIKey: (state, action) => {
            state.imgBB.APIKey = action.payload;
        },
        setDemoUserId: (state, action) => {
            state.demoUser.id = action.payload;
        },
    },
});

export const {
    tmdbSetConfig,
    imgBBSetAPIKey,
    setBackendIsInitialized,
    setDemoUserId,
} = configSlice.actions;

export const selectTmdbImagesSecureUrl = (state) =>
    state.config.tmdb.images.secure_base_url;
export const selectTmdbImagesPosterSizes = (state) =>
    state.config.tmdb.images.poster_sizes;
export const selectImgBBAPIKey = (state) => state.config.imgBB.APIKey;
export const selectDemoUserId = (state) => state.config.demoUser.id;

export default configSlice.reducer;
