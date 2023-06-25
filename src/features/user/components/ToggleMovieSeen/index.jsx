import { useSelector, useDispatch } from "react-redux";

import {
    selectToken,
    selectUserLanguage,
    addToMoviesSeen,
    removeFromMoviesSeen,
    removeFromMoviesToSee,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
    setShowLoggedOnlyDialog,
} from "../../userSlice";
import { setDestination } from "../../../navigation/navigationSlice";

import theme from "../../../../theme/theme";
import { FormControlLabel, Checkbox } from "@mui/material";

import PropTypes from "prop-types";

const ToggleMovieSeen = ({ toggleMovieInUserMovies, movieId }) => {
    ToggleMovieSeen.propTypes = {
        toggleMovieInUserMovies: PropTypes.func.isRequired,
        movieId: PropTypes.number.isRequired,
    };
    const language = useSelector(selectUserLanguage);
    const token = useSelector(selectToken);
    const moviesToSee = useSelector(selectUserMoviesToSee);
    const moviesSeen = useSelector(selectUserMoviesSeen);
    const dispatch = useDispatch();

    const userWantsToSeeMovie = moviesToSee.includes(movieId);
    const userHasSeenMovie = moviesSeen.includes(movieId);

    const handleMovieSeen = () => {
        if (!token) {
            dispatch(setDestination(`/movies/${movieId}`));
            dispatch(setShowLoggedOnlyDialog(true));
            return;
        }
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
            label={theme.languages[language].components.toggleMovieSeen}
        />
    );
};

export default ToggleMovieSeen;
