import store from "../app/store";
import { userAuth, userSignOut } from "../features/user";
import { filtersClearAll } from "../features/filters";

import { BASE_API_URI } from "./config";

/**
 * Get current user info
 *
 * @returns {Object}
 */

export const getUserInfo = async (setIsError) => {
    try {
        const tokenResponse = await fetch(`${BASE_API_URI}/API/users/token`, {
            credentials: "include",
        });
        if (!tokenResponse.ok) {
            throw new Error("Aucun token d'accès trouvé.");
        }
        const token = await tokenResponse.json();

        if (token) {
            store.dispatch(userAuth(token));

            const profileResponse = await fetch(
                `${BASE_API_URI}/API/users/profile`,
                {
                    credentials: "include",
                }
            );
            if (!profileResponse.ok) {
                setIsError(true);
                return {};
            }
            const data = await profileResponse.json();
            return data;
        }
    } catch (error) {
        console.log(error.message);
        return {};
    }

    return {};
};

/**
 * Log out user
 *
 * @param { Function } navigate
 */

export const logout = (navigate) => {
    fetch(`${BASE_API_URI}/API/users/logout`, { credentials: "include" })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log(error));

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
