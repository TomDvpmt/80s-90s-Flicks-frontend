import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectPageLocation } from "../../services/utils/selectors";

import { setCastAndCrew } from "../../utils/movie";

import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieCastAndCrew = ({ movie }) => {
    MovieCastAndCrew.propTypes = {
        movie: PropTypes.object.isRequired,
    };

    const page = useSelector(selectPageLocation());

    const [director, setDirector] = useState("");
    const [actors, setActors] = useState([""]);

    useEffect(() => {
        movie && setCastAndCrew(page, movie.id, setDirector, setActors);
    }, [page, movie.id]);

    return (
        <>
            {" "}
            <Typography paragraph>
                {director}
                {director && movie.release_date && " | "}
                {movie.release_date && movie.release_date.slice(0, 4)}
            </Typography>
            <Typography paragraph>{actors}</Typography>
        </>
    );
};

export default MovieCastAndCrew;
