import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    posterPath: "",
    backdropPath: "",
    title: "",
    originalTitle: "",
    tagline: "",
    director: "",
    releaseDate: "",
    actors: [],
    genres: [],
    overview: "",
    budget: 0,
    revenue: 0,
    imdbId: "",
};

const movieReducer = createReducer(initialState, (builder) => {
    return builder;
});

export default movieReducer;
