// User

// export const selectUserId = () => {
//     return (state) => state.user.id;
// };

// export const selectUsername = () => {
//     return (state) => state.user.username;
// };

// export const selectUserFirstName = () => {
//     return (state) => state.user.firstName;
// };

// export const selectUserLastName = () => {
//     return (state) => state.user.lastName;
// };

// export const selectUserEmail = () => {
//     return (state) => state.user.email;
// };

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
