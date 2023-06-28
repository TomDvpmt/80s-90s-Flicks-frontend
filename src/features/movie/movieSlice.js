import { createSlice } from "@reduxjs/toolkit";

const ALL_FILTERS = [
    {
        name: "allYearsMin",
        param: "&primary_release_date.gte=",
        value: "1980-01-01",
    },
    {
        name: "allYearsMax",
        param: "&release_date.lte=",
        value: "1999-12-31",
    },
    // { name: "language", param: "&language=", value: "fr" },
    {
        name: "page",
        param: "&page=",
        value: 1,
    },
    {
        name: "primaryReleaseYear",
        param: "&primary_release_year=",
        value: "",
    },
    { name: "sortBy", param: "&sort_by=", value: "revenue.desc" },
    { name: "withGenres", param: "&with_genres=", value: "" },
    { name: "withoutGenres", param: "&without_genres=", value: "99,10770" },
    {
        name: "originalLanguage",
        param: "&with_original_language=",
        value: "en",
    },
    { name: "withPeople", param: "&with_people=", value: "" },
];

const initialState = {
    allFilters: ALL_FILTERS,
    activeGenres: [],
    searchQuery: "",
    showSearchMovieDialog: false,
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setYear: (state, action) => {
            if (action.payload === "1980-1999") {
                state.allFilters = state.allFilters.map((filter) => {
                    if (filter.name === "primaryReleaseYear")
                        return { ...filter, value: "" };
                    else if (filter.name === "allYearsMin")
                        return { ...filter, value: "1980-01-01" };
                    else if (filter.name === "allYearsMax")
                        return { ...filter, value: "1999-12-31" };
                    else return filter;
                });
            } else {
                state.allFilters = state.allFilters.map((filter) => {
                    if (["allYearsMin", "allYearsMax"].includes(filter.name))
                        return { ...filter, value: "" };
                    else if (filter.name === "primaryReleaseYear")
                        return { ...filter, value: action.payload };
                    else return filter;
                });
            }
        },
        setLanguage: (state, action) => {
            state.allFilters = state.allFilters.map((filter) =>
                filter.name === "language"
                    ? { ...filter, value: action.payload }
                    : filter
            );
        },
        addActiveGenre: (state, action) => {
            state.activeGenres.push(action.payload);
        },
        setActiveGenres: (state, action) => {
            state.activeGenres = action.payload;
        },
        convertActiveGenresToFilter: (state, action) => {
            state.allFilters = state.allFilters.map((filter) =>
                filter.name === "withGenres"
                    ? { ...filter, value: action.payload.toString() }
                    : filter
            );
        },
        setPageNumber: (state, action) => {
            state.allFilters = state.allFilters.map((filter) =>
                filter.name === "page"
                    ? { ...filter, value: action.payload }
                    : filter
            );
        },
        clearAllFilters: (state, action) => initialState,
        setShowSearchMovieDialog: (state, action) => {
            state.showSearchMovieDialog = action.payload;
        },
    },
});

export const {
    setYear,
    setLanguage,
    addActiveGenre,
    setActiveGenres,
    convertActiveGenresToFilter,
    setPageNumber,
    clearAllFilters,
    setShowSearchMovieDialog,
} = movieSlice.actions;

export const selectFiltersYear = (state) => {
    const filtered =
        state.movie.allFilters.filter(
            (filter) => filter.name === "primaryReleaseYear"
        )[0].value || "1980-1999";

    return filtered;
};
export const selectFiltersActiveGenres = (state) => state.movie.activeGenres;
export const selectFiltersAll = (state) => state.movie.allFilters;
export const selectShowSearchMovieDialog = (state) =>
    state.movie.showSearchMovieDialog;

export default movieSlice.reducer;
