import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoritesLinks: [],
    moviesToSeeLinks: [],
    moviesSeenLinks: [],
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setFavoritesLinks: (state, action) => {
            state.favoritesLinks = action.payload;
        },
        setMoviesToSeeLinks: (state, action) => {
            state.moviesToSeeLinks = action.payload;
        },
        setMoviesSeenLinks: (state, action) => {
            state.moviesSeenLinks = action.payload;
        },
    },
});

export const { setFavoritesLinks, setMoviesToSeeLinks, setMoviesSeenLinks } =
    dashboardSlice.actions;

export const selectDashboardFavoritesLinks = (state) =>
    state.dashboard.favoritesLinks;
export const selectDashboardMoviesToSeeLinks = (state) =>
    state.dashboard.moviesToSeeLinks;
export const selectDashboardMoviesSeenLinks = (state) =>
    state.dashboard.moviesSeenLinks;

export default dashboardSlice.reducer;
