import { Link } from "react-router-dom";

import { TMDB_API_KEY } from "./config";

import { Typography } from "@mui/material";

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
