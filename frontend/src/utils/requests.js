import { Link } from "react-router-dom";

import { API_URI, TMDB_API_KEY } from "./config";

import store from "../services/utils/store";
import { userSetInfo } from "../services/features/user";

import { Typography } from "@mui/material";

/**
 * Get user info from database
 * @param {String} token
 * @returns { Promise }
 */

export const setUserInfo = async (token) => {
    if (token) {
        try {
            const response = await fetch(`${API_URI}users/0`, {
                method: "GET",
                headers: {
                    Authorization: `BEARER ${token}`,
                },
            });
            const data = await response.json();
            store.dispatch(userSetInfo(data));
        } catch (error) {
            console.log(error);
        }
    } else {
        store.dispatch(
            userSetInfo({
                id: "",
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                moviesSeen: [""],
                moviesToSee: [""],
                language: "fr",
            })
        );
    }
};

/**
 * Get movie's main data from The Movie Database
 * @param {Number} id
 * @returns {Promise}
 */

export const getMovieData = async (id, language) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=${language}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    return data;
};

/**
 * Get cast and crew of a movie from The Movie Database
 * @param {Number} movieId
 */

const getMovieCredits = async (movieId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`,
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
            let directorElement;
            if (page === "home" || page === "dashboard") {
                directorElement = movieDirector ? (
                    <Typography component="span" fontWeight="700">
                        {movieDirector.name}
                    </Typography>
                ) : (
                    ""
                );
            } else if (page === "movie") {
                directorElement = movieDirector ? (
                    <Link to={`/person/${movieDirector.id}`}>
                        {movieDirector.name}
                    </Link>
                ) : (
                    ""
                );
            }
            setDirector(directorElement);

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
                          .map((actor, index) => {
                              if (page === "home" || page === "dashboard") {
                                  return (
                                      <Typography
                                          key={actor.id}
                                          component="span">
                                          {actor.name}
                                          {index === numberOfActors - 1
                                              ? ""
                                              : ", "}
                                      </Typography>
                                  );
                              } else if (page === "movie") {
                                  return (
                                      <Link
                                          key={actor.id}
                                          to={`/person/${actor.id}`}>
                                          {actor.name}
                                          {index === numberOfActors - 1
                                              ? ""
                                              : ", "}
                                      </Link>
                                  );
                              }
                          })
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
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=fr`,
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
