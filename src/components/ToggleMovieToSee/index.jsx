import { useSelector } from "react-redux";

import {
    addToMoviesToSee,
    removeFromMoviesSeen,
    removeFromMoviesToSee,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../../features/userSlice";

import { FormControlLabel, Checkbox } from "@mui/material";

import PropTypes from "prop-types";

const ToggleMovieToSee = ({ toggleMovieInUserMovies, movieId, langData }) => {
    ToggleMovieToSee.propTypes = {
        toggleMovieInUserMovies: PropTypes.func.isRequired,
        movieId: PropTypes.number.isRequired,
        langData: PropTypes.object.isRequired,
    };

    const moviesToSee = useSelector(selectUserMoviesToSee);
    const moviesSeen = useSelector(selectUserMoviesSeen);
    const userWantsToSeeMovie = moviesToSee.includes(movieId);
    const userHasSeenMovie = moviesSeen.includes(movieId);

    const handleMovieToSee = () => {
        if (userWantsToSeeMovie) {
            toggleMovieInUserMovies(removeFromMoviesToSee);
        } else {
            userHasSeenMovie && toggleMovieInUserMovies(removeFromMoviesSeen);
            toggleMovieInUserMovies(addToMoviesToSee);
        }
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={userWantsToSeeMovie}
                    onChange={handleMovieToSee}
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
            label={langData.toSee}
        />
    );
};

export default ToggleMovieToSee;
