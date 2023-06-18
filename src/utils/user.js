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
            credentials: "include",
        });
        if (!response.ok) {
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
    try {
        fetch(`${BASE_API_URI}/API/users/logout`, { credentials: "include" })
            .then((response) => response.json())
            .then((data) => console.log(data));
    } catch (error) {
        console.log(error);
    }
    sessionStorage.removeItem("token");
    store.dispatch(userSignOut());
    store.dispatch(filtersClearAll());
    navigate("/login");
};

/**
 * Send PUT request to update MoviesToSee, MoviesSeen or Favorites in database
 *
 * @param {Number} userId
 * @param {Object} bodyObject
 */

export const updateUserMoviesInDB = (userId, bodyObject) => {
    fetch(`${BASE_API_URI}/API/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(bodyObject),
        credentials: "include",
    });
};
