import store from "../store/store";

import { setBackendIsInitialized } from "../features/configSlice";
import { signOut } from "../features/userSlice";
import { clearAll } from "../features/filtersSlice";

import { API_BASE_URI } from "../config/APIs";

/**
 * Get current user's token from backend
 *
 * @returns {String}
 */

export const getToken = async () => {
    try {
        const tokenResponse = await fetch(`${API_BASE_URI}/API/users/token`, {
            credentials: "include",
        });
        if (!tokenResponse.ok) {
            throw new Error("Aucun token d'accès trouvé.");
        }
        const token = await tokenResponse.json();

        console.log("token");
        store.dispatch(setBackendIsInitialized());

        return token;
    } catch (error) {
        console.log(error.message);
        return "";
    }
};

/**
 * Get current user info
 *
 * @returns {Object}
 */

export const getUserInfo = async () => {
    try {
        const profileResponse = await fetch(
            `${API_BASE_URI}/API/users/profile`,
            {
                credentials: "include",
            }
        );
        if (!profileResponse.ok) {
            return {};
        }
        const data = await profileResponse.json();
        return data;
    } catch (error) {
        console.error(error.message);
        return {};
    }
};

/**
 * Log out user
 *
 * @param { Function } navigate
 */

export const logout = (navigate) => {
    fetch(`${API_BASE_URI}/API/users/logout`, {
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            store.dispatch(signOut());
            store.dispatch(clearAll());
            navigate("/login");
        })
        .catch((error) => console.log(error));
};

/**
 * Send PUT request to update MoviesToSee, MoviesSeen or Favorites in database
 *
 * @param {Number} userId
 * @param {Object} bodyObject
 */

export const updateUserMoviesInDB = (userId, bodyObject) => {
    fetch(`${API_BASE_URI}/API/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(bodyObject),
        credentials: "include",
    });
};
