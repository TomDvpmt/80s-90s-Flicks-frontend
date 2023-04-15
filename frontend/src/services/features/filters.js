import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    allFilters: [
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
        { name: "language", param: "&language=", value: "fr" },
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
    ],
    activeGenres: [],
    searchQuery: "",
};

export const filterYear = createAction("filters/year");
export const filtersAddActiveGenre = createAction("filters/addActiveGenre");
export const filtersRemoveActiveGenre = createAction(
    "filters/removeActiveGenre"
);
export const filtersClearActiveGenres = createAction(
    "filters/clearActiveGenres"
);
export const filtersConvertActiveGenresToFilter = createAction(
    "filters/convertActiveGenresToFilter"
);
export const filtersSetPageNumber = createAction("filters/setPageNumber");

const filtersReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(filterYear, (draft, action) => {
            if (action.payload === "All") {
                draft.allFilters = draft.allFilters.map((filter) => {
                    if (filter.name === "primaryReleaseYear")
                        return { ...filter, value: "" };
                    else if (filter.name === "allYearsMin")
                        return { ...filter, value: "1980-01-01" };
                    else if (filter.name === "allYearsMax")
                        return { ...filter, value: "1999-12-31" };
                    else return filter;
                });
            } else {
                draft.allFilters = draft.allFilters.map((filter) => {
                    if (["allYearsMin", "allYearsMax"].includes(filter.name))
                        return { ...filter, value: "" };
                    else if (filter.name === "primaryReleaseYear")
                        return { ...filter, value: action.payload };
                    else return filter;
                });
            }
        })
        .addCase(filtersAddActiveGenre, (draft, action) => {
            draft.activeGenres.push(action.payload);
        })
        .addCase(filtersRemoveActiveGenre, (draft, action) => {
            draft.activeGenres = draft.activeGenres.filter(
                (genre) => genre !== action.payload
            );
        })
        .addCase(filtersClearActiveGenres, (draft, action) => {
            draft.activeGenres = [];
        })
        .addCase(filtersConvertActiveGenresToFilter, (draft, action) => {
            draft.allFilters = draft.allFilters.map((filter) =>
                filter.name === "withGenres"
                    ? { ...filter, value: action.payload.toString() }
                    : filter
            );
        })
        .addCase(filtersSetPageNumber, (draft, action) => {
            draft.allFilters = draft.allFilters.map((filter) =>
                filter.name === "page"
                    ? { ...filter, value: action.payload }
                    : filter
            );
        });
});

export default filtersReducer;
