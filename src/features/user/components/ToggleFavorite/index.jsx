import { useDispatch, useSelector } from "react-redux";

import {
    selectToken,
    selectUserLanguage,
    addToFavorites,
    removeFromFavorites,
    selectUserId,
    selectUserFavorites,
    setShowLoggedOnlyDialog,
} from "../../userSlice";
import { setDestination } from "../../../navigation/navigationSlice";

import { updateUserMoviesInDB } from "../../userUtils";

import theme from "../../../../theme/theme";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

import PropTypes from "prop-types";

const ToggleFavorite = ({ movieId }) => {
    ToggleFavorite.propTypes = {
        movieId: PropTypes.number.isRequired,
    };

    const language = useSelector(selectUserLanguage);
    const token = useSelector(selectToken);
    const userId = useSelector(selectUserId);
    const favorites = useSelector(selectUserFavorites);
    const isFavorite = favorites.includes(movieId);
    const dispatch = useDispatch();

    const addMovieToFavorites = () => {
        dispatch(addToFavorites(movieId));
        try {
            updateUserMoviesInDB(userId, {
                favorites: [...favorites, movieId],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeMovieFromFavorites = () => {
        dispatch(removeFromFavorites(movieId));
        try {
            updateUserMoviesInDB(userId, {
                favorites: favorites.filter((id) => id !== movieId),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleFavoriteCheckbox = () => {
        if (token === "") {
            dispatch(setDestination(`/movies/${movieId}`));
            dispatch(setShowLoggedOnlyDialog(true));
            return;
        }
        if (isFavorite) {
            removeMovieFromFavorites();
        } else {
            addMovieToFavorites();
        }
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    inputProps={{
                        "aria-label":
                            theme.languages[language].components.toggleFavorite
                                .add,
                    }}
                    icon={
                        <StarBorder
                            sx={{
                                color: theme.palette.brandingWarm.main,
                            }}
                        />
                    }
                    checkedIcon={
                        <Star
                            sx={{
                                color: theme.palette.brandingWarm.main,
                            }}
                        />
                    }
                    checked={isFavorite}
                    onChange={handleFavoriteCheckbox}
                />
            }
            label={
                isFavorite
                    ? theme.languages[language].components.toggleFavorite.remove
                    : theme.languages[language].components.toggleFavorite.add
            }
        />
    );
};

export default ToggleFavorite;
