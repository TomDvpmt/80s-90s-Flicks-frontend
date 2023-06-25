import { TMDB_API_KEY, TMDB_BASE_URI } from "../../config/APIs";

/**
 * Get movie's main data from The Movie Database
 * @param {Number} id
 * @returns {Promise}
 */

export const getMovieData = async (id, language) => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URI}/movie/${id}?api_key=${TMDB_API_KEY}&language=${language}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error();
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(
            "Impossible de récupérer les données depuis l'API The Movie Database."
        );
    }
};
