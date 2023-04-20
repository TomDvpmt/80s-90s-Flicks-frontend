import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
};

export const moviesSetAll = createAction("movies/setAll");

const moviesReducer = createReducer(initialState, (builder) => {
    return builder.addCase(moviesSetAll, (draft, action) => {
        draft.movies = action.payload;
    });
});

export default moviesReducer;
