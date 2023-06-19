import { TMDB_API_KEY, TMDB_BASE_URI } from "./config";
import defaultPoster from "../assets/img/defaultPoster.jpeg";

/**
 * Get list items from filmography data
 *
 * @param {*} data
 * @param {*} type
 * @returns
 */

const getFilmographyElements = (data, type, imageBaseUrl) => {
    let baseArray = [];
    if (type === "acting" && data.cast) baseArray = data.cast;
    else if (type === "directing" && data.crew) baseArray = data.crew;
    else if (type === "writing" && data.crew) baseArray = data.crew;

    const movies =
        baseArray &&
        baseArray
            .filter((movie) => {
                if (type === "acting") {
                    return (
                        movie.release_date &&
                        movie.adult === false &&
                        !movie.genre_ids.includes(99 || 10770) &&
                        movie.genre_ids.length > 0
                    );
                } else if (type === "directing") {
                    return (
                        movie.release_date &&
                        movie.adult === false &&
                        movie.job === "Director" &&
                        !movie.genre_ids.includes(99 || 10770) &&
                        movie.genre_ids.length > 0
                    );
                } else if (type === "writing") {
                    return (
                        movie.release_date &&
                        movie.adult === false &&
                        movie.job === "Screenplay" &&
                        !movie.genre_ids.includes(99 || 10770) &&
                        movie.genre_ids.length > 0
                    );
                }
                return null;
            })
            .sort(
                (a, b) =>
                    parseInt(a.release_date.slice(0, 4)) -
                    parseInt(b.release_date.slice(0, 4))
            )
            .map((movie) => {
                const posterPath = movie.poster_path;
                const hasPoster = posterPath !== null && posterPath !== "";
                const imgSrc = hasPoster
                    ? `${imageBaseUrl}w92${posterPath}`
                    : defaultPoster;

                return { ...movie, imgSrc };
            });
    return movies;
};

/**
 * Get a person's main data
 *
 * @param {Number} personId
 * @returns { Object }
 */

const getPersonMainData = async (personId, language) => {
    if (personId) {
        try {
            const response = await fetch(
                `${TMDB_BASE_URI}/person/${personId}?api_key=${TMDB_API_KEY}&language=${language}`
            );
            const person = await response.json();
            return person;
        } catch (error) {
            throw new Error(error);
        }
    }
};

/**
 * Get a person's filmography
 *
 * @param { Number } personId
 * @returns { Object }
 */

const getFilmography = async (personId, language, imageBaseUrl) => {
    if (personId) {
        try {
            const response = await fetch(
                `${TMDB_BASE_URI}/person/${personId}/movie_credits?api_key=${TMDB_API_KEY}&language=${language}&with_original_language=en`
            );
            const data = await response.json();
            const actingMovies = getFilmographyElements(
                data,
                "acting",
                imageBaseUrl
            );
            const directingMovies = getFilmographyElements(
                data,
                "directing",
                imageBaseUrl
            );
            const writingMovies = getFilmographyElements(
                data,
                "writing",
                imageBaseUrl
            );
            const filmography = {
                actingMovies,
                directingMovies,
                writingMovies,
            };
            return filmography;
        } catch (error) {
            throw new Error(error);
        }
    }
};

/**
 * Get a person's photo from Wikipedia API
 * API documentation : https://en.wikipedia.org/w/api.php
 *
 * @param {Number} personId
 * @returns
 */

const getPersonPhotoFromWikipedia = async (personId) => {
    const person = await getPersonMainData(personId);
    const personFormatedName = person.name.replace(" ", "_");

    if (personFormatedName) {
        try {
            // To avoid CORS blocking, include "origin=*" in fetch url
            const response = await fetch(
                `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=thumbnail&pithumbsize=300&origin=*&titles=${personFormatedName}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            const firstPart = data.query.pages;
            const imgUrl = Object.keys(firstPart).reduce(
                (acc, key) =>
                    firstPart[key].thumbnail && firstPart[key].thumbnail.source,
                ""
            );
            return imgUrl;
        } catch (error) {
            throw new Error(error);
        }
    }
};

/**
 * get a person's complete data
 *
 * @param {Number} personId
 * @param {String} language
 * @param {String} imageBaseUrl
 * @returns
 */

export const getPersonFullData = async (personId, language, imageBaseUrl) => {
    const mainData = await getPersonMainData(personId, language);
    const imgUrl = await getPersonPhotoFromWikipedia(personId);
    const filmography = await getFilmography(personId, language, imageBaseUrl);
    return {
        mainData,
        imgUrl,
        filmography,
    };
};
