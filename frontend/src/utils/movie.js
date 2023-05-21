import { Link as RouterLink } from "react-router-dom";

import { TMDB_API_KEY } from "./config";

import { Box, Typography, Link } from "@mui/material";
import theme from "../assets/styles/theme";

/**
 * Get movie's main data from The Movie Database
 * @param {Number} id
 * @returns {Promise}
 */

export const getMovieData = async (id, language) => {
    try {
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
    } catch (error) {
        throw new Error(
            "Impossible de récupérer les données depuis l'API The Movie Database."
        );
    }
};

/**
 * Get the Link component for movie director
 *
 * @param {String} page
 * @param {Object} crew
 * @returns { HTMLAnchorElement }
 */

const getMovieDirectorElements = (page, crew) => {
    const numberOfDirectors = 2;

    const movieDirectors = crew
        ?.filter((person) => person.job === "Director")
        .slice(
            0,
            crew.length >= numberOfDirectors ? numberOfDirectors : crew.length
        );

    let directorsElements = [];

    if (page === "home" || page === "dashboard") {
        directorsElements = movieDirectors?.map((director, index) => (
            <Box key={director.id} component="span">
                <Typography component="span" fontWeight="700">
                    {director.name}
                </Typography>
                {index === movieDirectors.length - 1 ? "" : ", "}
            </Box>
        ));
    } else if (page === "movie") {
        directorsElements = movieDirectors.map((director, index) => (
            <Box key={director.id} component="span" fontWeight="700">
                <Link
                    component={RouterLink}
                    to={`/person/${director.id}`}
                    underline="hover"
                    color={theme.palette.text.lightBg}>
                    {director.name}
                </Link>
                {index === movieDirectors.length - 1 ? "" : ", "}
            </Box>
        ));
    }
    return directorsElements;
};

/**
 * Get the Link components for movie writers
 *
 * @param {String} page
 * @param {Object} crew
 * @returns {Array} // Array of HTMLAnchorElement
 */

const getMovieWritersElements = (crew) => {
    const numberOfWriters = 2;

    const writersElements = crew
        ?.filter((person) => person.job === "Screenplay")
        ?.slice(
            0,
            crew.length >= numberOfWriters ? numberOfWriters : crew.length
        );

    return writersElements.map((writer, index) => (
        <Box key={writer.id} component="span">
            <Link
                component={RouterLink}
                to={`/person/${writer.id}`}
                underline="hover"
                color={theme.palette.text.lightBg}>
                {writer.name}
            </Link>
            {index === writersElements.length - 1 ? "" : ", "}
        </Box>
    ));
};

/**
 * Get the Link (React Router) or Typography (MUI) components for movie actors
 *
 * @param {String} page
 * @param {Object} cast
 * @returns {Array} // Array of HTMLAnchorElement
 */

const getMovieActorsElements = (page, cast) => {
    const numberOfActors = page === "home" || page === "dashboard" ? 3 : 10;
    let actorsElements;

    actorsElements =
        cast && cast.length > 0
            ? cast
                  .slice(
                      0,
                      cast.length >= numberOfActors
                          ? numberOfActors
                          : cast.length
                  )
                  .map((actor, index) => {
                      if (page === "home" || page === "dashboard") {
                          return (
                              <Typography key={actor.id} component="span">
                                  {actor.name}
                                  {index === numberOfActors - 1 ? "" : ", "}
                              </Typography>
                          );
                      } else if (page === "movie") {
                          return (
                              <Box key={actor.id} component="span">
                                  <Link
                                      component={RouterLink}
                                      to={`/person/${actor.id}`}
                                      underline="hover"
                                      color={theme.palette.text.lightBg}>
                                      {actor.name}
                                  </Link>
                                  {index === numberOfActors - 1 ? "" : ", "}
                              </Box>
                          );
                      }
                  })
            : [""];
    return actorsElements;
};

/**
 * Display cast and crew of a specific movie
 * @param {String} page
 * @param {Number} movieId
 * @param {import("react").SetStateAction} setDirector
 * @param {import("react").SetStateAction} setWriters
 * @param {import("react").SetStateAction} setActors
 */

export const setCastAndCrew = async (
    page,
    movieId,
    setDirector,
    setWriters,
    setActors
) => {
    if (movieId) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            const directorElement = getMovieDirectorElements(page, data.crew);
            setDirector(directorElement);

            const writersElements = getMovieWritersElements(data.crew);
            setWriters(writersElements);

            const actorsElements = getMovieActorsElements(page, data.cast);
            setActors(actorsElements);
            return;
        } catch (error) {
            console.error(error);
        }
    }
    return;
};
