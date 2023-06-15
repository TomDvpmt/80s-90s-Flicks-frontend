import store from "../app/store";
import { userSignOut } from "../features/user";
import { filtersClearAll } from "../features/filters";

import { BASE_API_URI } from "./config";

/**
 * Get current user info
 *
 * @returns {Object}
 */

export const getUserInfo = async (setIsError) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        const response = await fetch(`${BASE_API_URI}/API/users/profile`, {
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
    store.dispatch(filtersClearAll());
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

    fetch(`${BASE_API_URI}/API/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Authorization: `BEARER ${token}`,
        },
        body: JSON.stringify(bodyObject),
    });
};
