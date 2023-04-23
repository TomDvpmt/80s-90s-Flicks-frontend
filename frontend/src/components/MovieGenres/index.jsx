import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { filtersAddActiveGenre } from "../../services/features/filters";

import { Box } from "@mui/material";

import PropTypes from "prop-types";

const MovieGenres = ({ genres }) => {
    MovieGenres.propTypes = {
        genres: PropTypes.arrayOf(PropTypes.object.isRequired),
    };

    const dispatch = useDispatch();

    const handleGenreClick = (e) => {
        dispatch(filtersAddActiveGenre(parseInt(e.target.id)));
    };

    return (
        genres !== undefined &&
        genres !== null &&
        genres.length > 0 && (
            <Box>
                {genres.map((genre, index) => (
                    <Link
                        key={index}
                        id={genre.id}
                        to="/"
                        onClick={handleGenreClick}>
                        {genre.name}
                        {index === genres.length - 1 ? "" : ", "}
                    </Link>
                ))}
            </Box>
        )
    );
};

export default MovieGenres;
