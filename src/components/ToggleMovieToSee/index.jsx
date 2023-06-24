import { useSelector, useDispatch } from "react-redux";

import {
    selectUserLanguage,
    addToMoviesToSee,
    removeFromMoviesSeen,
    removeFromMoviesToSee,
    selectUserToken,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../../features/userSlice";
import { setShowLoggedOnlyDialog } from "../../features/dialogsSlice";
import { setDestination } from "../../features/pageSlice";

import theme from "../../styles/theme";
import { FormControlLabel, Checkbox } from "@mui/material";

import PropTypes from "prop-types";

const ToggleMovieToSee = ({ toggleMovieInUserMovies, movieId }) => {
    ToggleMovieToSee.propTypes = {
        toggleMovieInUserMovies: PropTypes.func.isRequired,
        movieId: PropTypes.number.isRequired,
    };

    const language = useSelector(selectUserLanguage);
    const token = useSelector(selectUserToken);
    const moviesToSee = useSelector(selectUserMoviesToSee);
    const moviesSeen = useSelector(selectUserMoviesSeen);
    const dispatch = useDispatch();

    const userWantsToSeeMovie = moviesToSee.includes(movieId);
    const userHasSeenMovie = moviesSeen.includes(movieId);

    const handleMovieToSee = () => {
        if (!token) {
            dispatch(setDestination(`/movies/${movieId}`));
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
            label={theme.languages[language].components.toggleMovieToSee}
        />
    );
};

export default ToggleMovieToSee;
