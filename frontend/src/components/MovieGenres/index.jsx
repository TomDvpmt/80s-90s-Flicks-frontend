import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { filtersAddActiveGenre } from "../../features/filters";

import { Box, Link, Button } from "@mui/material";

import PropTypes from "prop-types";

const MovieGenres = ({ genres }) => {
    MovieGenres.propTypes = {
        genres: PropTypes.arrayOf(PropTypes.object.isRequired),
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGenreClick = (e) => {
        dispatch(filtersAddActiveGenre(parseInt(e.target.id)));
        navigate("/");
    };

    return (
        genres !== undefined &&
        genres !== null &&
        genres.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                {genres.map((genre, index) => (
                    <Button
                        key={index}
                        id={genre.id}
                        variant="contained"
                        size="small"
                        onClick={handleGenreClick}>
                        {genre.name}
                    </Button>
                ))}
            </Box>
        )
    );
};

export default MovieGenres;
