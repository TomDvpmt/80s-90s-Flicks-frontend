import { useSelector } from "react-redux";

import {
    addToMoviesSeen,
    removeFromMoviesSeen,
    removeFromMoviesToSee,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../../features/userSlice";

import { FormControlLabel, Checkbox } from "@mui/material";

import PropTypes from "prop-types";

const ToggleMovieSeen = ({ toggleMovieInUserMovies, movieId, langData }) => {
    ToggleMovieSeen.propTypes = {
        toggleMovieInUserMovies: PropTypes.func.isRequired,
        movieId: PropTypes.number.isRequired,
        langData: PropTypes.object.isRequired,
    };

    const moviesToSee = useSelector(selectUserMoviesToSee);
    const moviesSeen = useSelector(selectUserMoviesSeen);
    const userWantsToSeeMovie = moviesToSee.includes(movieId);
    const userHasSeenMovie = moviesSeen.includes(movieId);

    const handleMovieSeen = () => {
        if (userHasSeenMovie) {
            toggleMovieInUserMovies(removeFromMoviesSeen);
            return;
        }
        userWantsToSeeMovie && toggleMovieInUserMovies(removeFromMoviesToSee);
        toggleMovieInUserMovies(addToMoviesSeen);
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={userHasSeenMovie}
                    onChange={handleMovieSeen}
                    sx={{
                        color: {
                            md: "white",
                        },
                        "&.Mui-checked": {
                            color: {
                                md: "white",
                            },
                        },
                    }}
                />
            }
            label={langData.seen}
        />
    );
};

export default ToggleMovieSeen;
