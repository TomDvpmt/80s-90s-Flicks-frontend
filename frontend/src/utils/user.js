import store from "../services/utils/store";
import { userSignOut } from "../services/features/user";

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
