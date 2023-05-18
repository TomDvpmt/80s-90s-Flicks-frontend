import store from "../app/store";
import { userSignOut } from "../features/user";

/**
 * Get current user info
 *
 * @returns {Object}
 */

export const getUserInfo = async (setIsError) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        const response = await fetch(`/API/users/profile`, {
            method: "GET",
            headers: {
                Authorization: `BEARER ${token}`,
            },
        });
        if (response.status >= 400) {
            setIsError(true);
            return {};
        }
        const data = await response.json();
        return data;
    }
    return {};
};

/**
 * Log out user
 *
 * @param { Function } navigate
 */

export const logout = (navigate) => {
    sessionStorage.removeItem("token");
    store.dispatch(userSignOut());
    navigate("/login");
};

export const userMovieMethods = {
    //
};

/**
 * Send PUT request to update MoviesToSee, MoviesSeen or Favorites in database
 *
 * @param {Number} userId
 * @param {Object} bodyObject
 */

export const updateUserMoviesInDB = (userId, bodyObject) => {
    const token = sessionStorage.getItem("token");

    fetch(`/API/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Authorization: `BEARER ${token}`,
        },
        body: JSON.stringify(bodyObject),
    });
};
