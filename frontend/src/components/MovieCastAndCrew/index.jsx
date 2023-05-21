import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MovieReleaseDate from "../MovieReleaseDate";

import { selectPageLocation } from "../../app/selectors";

import { setCastAndCrew } from "../../utils/movie";

import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieCastAndCrew = ({ movieId, releaseDate }) => {
    MovieCastAndCrew.propTypes = {
        movieId: PropTypes.number.isRequired,
        releaseDate: PropTypes.string.isRequired,
    };

    const page = useSelector(selectPageLocation());

    const [director, setDirector] = useState("");
    const [writers, setWriters] = useState([""]);
    const [actors, setActors] = useState([""]);

    useEffect(() => {
        try {
            setCastAndCrew(page, movieId, setDirector, setWriters, setActors);
        } catch (error) {
            console.log(error);
        }
    }, [page, movieId]);

    return (
        <>
            <Typography paragraph>
                {page === "movie" && (
                    <Typography component="span">De </Typography>
                )}
                <Typography component="span" fontWeight="700">
                    {director}
                </Typography>

                {director && releaseDate && " | "}
                {releaseDate && <MovieReleaseDate date={releaseDate} />}
            </Typography>
            {page === "movie" && writers.length > 0 && (
                <Typography paragraph>
                    <Typography component="span">Écrit par </Typography>
                    <Typography component="span" fontWeight="700">
                        {writers}
                    </Typography>
                </Typography>
            )}
            <Typography paragraph>
                {page === "movie" && (
                    <Typography component="span">Avec </Typography>
                )}
                <Typography component="span" fontWeight="700">
                    {actors}
                </Typography>
            </Typography>
        </>
    );
};

export default MovieCastAndCrew;
