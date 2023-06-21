import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectPageLocation } from "../../features/pageSlice";

import { TMDB_BASE_URI, TMDB_API_KEY } from "../../config/APIs";
import {
    NUMBER_OF_DIRECTORS,
    NUMBER_OF_WRITERS,
    NUMBER_OF_ACTORS_ON_MOVIE_PAGE,
    NUMBER_OF_ACTORS_ON_MOVIE_CARD,
} from "../../config/movie";

import MovieReleaseDate from "../MovieReleaseDate";
import PersonLabel from "../PersonLabel";

import { Typography, Box } from "@mui/material";

import PropTypes from "prop-types";

const MovieCastAndCrew = ({ movieId, releaseDate }) => {
    MovieCastAndCrew.propTypes = {
        movieId: PropTypes.number.isRequired,
        releaseDate: PropTypes.string.isRequired,
    };

    const page = useSelector(selectPageLocation);

    const [directors, setDirectors] = useState([]);
    const [writers, setWriters] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetch(
            `${TMDB_BASE_URI}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((data) => {
                // directors
                const movieDirectors = data.crew
                    ?.filter((person) => person.job === "Director")
                    .slice(
                        0,
                        data.crew.length >= NUMBER_OF_DIRECTORS
                            ? NUMBER_OF_DIRECTORS
                            : data.crew.length
                    );
                setDirectors(
                    movieDirectors.map((director, index) => (
                        <Typography key={index} component="span">
                            <PersonLabel
                                person={director}
                                isLink={page === "movie"}
                                isStrong={true}
                            />
                            {index === movieDirectors.length - 1 ? "" : ", "}
                        </Typography>
                    ))
                );

                // writers
                const movieWriters = data.crew
                    ?.filter((person) => person.job === "Screenplay")
                    ?.slice(
                        0,
                        data.crew.length >= NUMBER_OF_WRITERS
                            ? NUMBER_OF_WRITERS
                            : data.crew.length
                    );
                setWriters(
                    movieWriters.map((writer, index) => (
                        <Typography key={index} component="span">
                            <PersonLabel
                                person={writer}
                                isLink={page === "movie"}
                                isStrong={page === "movie"}
                            />
                            {index === movieWriters.length - 1 ? "" : ", "}
                        </Typography>
                    ))
                );

                // actors
                const numberOfActors =
                    page === "home" || page === "dashboard"
                        ? NUMBER_OF_ACTORS_ON_MOVIE_CARD
                        : NUMBER_OF_ACTORS_ON_MOVIE_PAGE;

                const numberOfActorsToDisplay =
                    data.cast.length >= numberOfActors
                        ? numberOfActors
                        : data.cast.length;

                const movieActors = data.cast.slice(0, numberOfActorsToDisplay);

                setActors(
                    movieActors.map((actor, index) => (
                        <Typography key={index} component="span">
                            <PersonLabel
                                person={actor}
                                isLink={page === "movie"}
                                isStrong={page === "movie"}
                            />
                            {index === movieActors.length - 1 ? "" : ", "}
                        </Typography>
                    ))
                );
            });
    }, [movieId, page]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap=".6rem"
            sx={{
                "& .credit--strong": {
                    fontWeight: "700",
                },
            }}>
            <Typography>
                {page === "movie" && directors.length > 0 && (
                    <Typography component="span">De </Typography>
                )}
                <Typography component="span" fontWeight="700">
                    {directors}
                </Typography>

                {directors.length > 0 && releaseDate && " | "}
                {releaseDate && <MovieReleaseDate date={releaseDate} />}
            </Typography>
            {page === "movie" && writers.length > 0 && (
                <Typography>
                    <Typography component="span">Écrit par </Typography>
                    <Typography component="span" fontWeight="700">
                        {writers}
                    </Typography>
                </Typography>
            )}
            <Typography>
                {page === "movie" && actors.length > 0 && (
                    <Typography component="span">Avec </Typography>
                )}
                <Typography component="span" fontWeight="700">
                    {actors}
                </Typography>
            </Typography>
        </Box>
    );
};

export default MovieCastAndCrew;
