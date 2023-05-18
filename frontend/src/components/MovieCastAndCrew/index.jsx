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
    const [actors, setActors] = useState([""]);

    useEffect(() => {
        setCastAndCrew(page, movieId, setDirector, setActors);
    }, [page, movieId]);

    return (
        <>
            <Typography paragraph fontWeight="700">
                {director}
                {director && releaseDate && " | "}
                {releaseDate && <MovieReleaseDate date={releaseDate} />}
            </Typography>
            <Typography paragraph fontWeight="700">
                {actors}
            </Typography>
        </>
    );
};

export default MovieCastAndCrew;
