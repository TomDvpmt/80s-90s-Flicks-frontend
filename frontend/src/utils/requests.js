import { Link } from "react-router-dom";

import store from "../services/utils/store";
import { userSetInfo } from "../services/features/user";

/**
 * Get user info from database
 * @param {String} token
 * @returns { Promise }
 */

export const setUserInfo = async (token) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URI}users/0`,
            {
                method: "GET",
                headers: {
                    Authorization: `BEARER ${token}`,
                },
            }
        );
        const data = await response.json();
        store.dispatch(userSetInfo(data));
    } catch (error) {
        console.log(error);
    }
};

/**
 * Get movie's main data from The Movie Database
 * @param {Number} id
 * @returns {Promise}
 */

export const getMovieData = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=en`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Get cast and crew of a movie from The Movie Database
 * @param {Number} movieId
 */

const getMovieCredits = async (movieId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2d0a75daa1b16703efb5d87960c9e67e`,
            {
                method: "GET",
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Display cast and crew of a specific movie
 * @param {String} page
 * @param {Number} movieId
 * @param {import("react").SetStateAction} setDirector
 * @param {import("react").SetStateAction} setActors
 */

export const setCastAndCrew = async (page, movieId, setDirector, setActors) => {
    getMovieCredits(movieId)
        .then((data) => {
            const movieDirector = data.crew.filter(
                (person) => person.job === "Director"
            )[0];
            setDirector(
                movieDirector ? (
                    <Link to={`/person/${movieDirector.id}`}>
                        {movieDirector.name}
                    </Link>
                ) : (
                    ""
                )
            );

            const numberOfActors = page === "home" ? 3 : 10;
            data.cast.length > 0
                ? setActors(
                      data.cast
                          .slice(
                              0,
                              data.cast.length >= numberOfActors
                                  ? numberOfActors
                                  : data.cast.length
                          )
                          .map((actor, index) => (
                              <Link key={actor.id} to={`/person/${actor.id}`}>
                                  {actor.name}
                                  {index === numberOfActors - 1 ? "" : ", "}
                              </Link>
                          ))
                  )
                : setActors([""]);
        })
        .catch((error) => console.log(error));
};

/**
 * Get the list of all available genres from The Movie Database
 * @returns {Promise}
 */

export const getGenres = async () => {
    try {
        const results = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=en`,
            {
                method: "GET",
            }
        );
        const data = await results.json();
        return data.genres;
    } catch (error) {
        console.log(error);
    }
};
