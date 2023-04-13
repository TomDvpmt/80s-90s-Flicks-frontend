// User

export const selectUserIsSignedIn = () => {
    return (state) => state.user.token !== "" && state.user.token !== null;
};

export const selectUserToken = () => {
    return (state) => state.user.token;
};

// Page

export const selectPageType = () => {
    return (state) => state.page.type;
};

// Filters

export const selectFiltersActiveGenres = () => {
    return (state) => state.filters.activeGenres;
};

export const selectFiltersAll = () => {
    return (state) => state.filters.allFilters;
};
