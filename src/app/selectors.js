// User

export const selectUserIsSignedIn = () => {
    return (state) => state.user.isSignedIn;
};

export const selectUserToken = () => {
    return (state) => state.user.token;
};

export const selectUserId = () => {
    return (state) => state.user.id;
};

export const selectUserAvatarUrl = () => {
    return (state) => state.user.avatarUrl;
};

export const selectUserUsername = () => {
    return (state) => state.user.username;
};

export const selectUserFirstName = () => {
    return (state) => state.user.firstName;
};

export const selectUserLastName = () => {
    return (state) => state.user.lastName;
};

export const selectUserEmail = () => {
    return (state) => state.user.email;
};

export const selectUserMoviesSeen = (state) => {
    return (state) => state.user.moviesSeen;
};

export const selectUserMoviesToSee = () => {
    return (state) => state.user.moviesToSee;
};

export const selectUserFavorites = () => {
    return (state) => state.user.favorites;
};

export const selectUserLanguage = () => {
    return (state) => state.user.language;
};

// Filters

export const selectFiltersYear = () => {
    return (state) =>
        state.filters.allFilters.filter(
            (filter) => filter.name === "primaryReleaseYear"
        )[0].value || "1980-1999";
};

export const selectFiltersActiveGenres = () => {
    return (state) => state.filters.activeGenres;
};

export const selectFiltersAll = () => {
    return (state) => state.filters.allFilters;
};
