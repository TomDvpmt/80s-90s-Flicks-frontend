import { useSelector } from "react-redux";

import {
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../../app/selectors";

import { FormControlLabel, Checkbox } from "@mui/material";

import PropTypes from "prop-types";
import {
    userAddToMoviesToSee,
    userRemoveFromMoviesSeen,
    userRemoveFromMoviesToSee,
} from "../../features/user";

const ToggleMovieToSee = ({
    toggleMovieInUserMovies,
    movieId,
    methods,
    langData,
}) => {
    ToggleMovieToSee.propTypes = {
        toggleMovieInUserMovies: PropTypes.func.isRequired,
        movieId: PropTypes.number.isRequired,
        langData: PropTypes.object.isRequired,
    };

    const moviesToSee = useSelector(selectUserMoviesToSee());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const userWantsToSeeMovie = moviesToSee.includes(movieId);
    const userHasSeenMovie = moviesSeen.includes(movieId);

    const handleMovieToSee = () => {
        if (userWantsToSeeMovie) {
            toggleMovieInUserMovies(userRemoveFromMoviesToSee);
        } else {
            userHasSeenMovie &&
                toggleMovieInUserMovies(userRemoveFromMoviesSeen);
            toggleMovieInUserMovies(userAddToMoviesToSee);
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
