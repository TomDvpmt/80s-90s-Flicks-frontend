import { useSelector, useDispatch } from "react-redux";

import {
    addToMoviesToSee,
    removeFromMoviesSeen,
    removeFromMoviesToSee,
    selectUserIsSignedIn,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../../features/userSlice";
import { setShowLoggedOnlyDialog } from "../../features/dialogsSlice";

import { FormControlLabel, Checkbox } from "@mui/material";

import PropTypes from "prop-types";

const ToggleMovieToSee = ({ toggleMovieInUserMovies, movieId, langData }) => {
    ToggleMovieToSee.propTypes = {
        toggleMovieInUserMovies: PropTypes.func.isRequired,
        movieId: PropTypes.number.isRequired,
        langData: PropTypes.object.isRequired,
    };

    const isSignedIn = useSelector(selectUserIsSignedIn);
    const moviesToSee = useSelector(selectUserMoviesToSee);
    const moviesSeen = useSelector(selectUserMoviesSeen);
    const dispatch = useDispatch();

    const userWantsToSeeMovie = moviesToSee.includes(movieId);
    const userHasSeenMovie = moviesSeen.includes(movieId);

    const handleMovieToSee = () => {
        if (!isSignedIn) {
            dispatch(setShowLoggedOnlyDialog(true));
            return;
        }
        if (userWantsToSeeMovie) {
            toggleMovieInUserMovies(removeFromMoviesToSee);
            return;
        }

        userHasSeenMovie && toggleMovieInUserMovies(removeFromMoviesSeen);
        toggleMovieInUserMovies(addToMoviesToSee);
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
