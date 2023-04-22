import { useDispatch, useSelector } from "react-redux";

import {
    userAddToFavorites,
    userRemoveFromFavorites,
} from "../../services/features/user";

import {
    selectUserFavorites,
    selectUserId,
} from "../../services/utils/selectors";

import { fetchMovieInUser } from "../../utils/movie";

import { Checkbox, FormControlLabel } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import PropTypes from "prop-types";

const AddToFavorites = ({ movieId }) => {
    AddToFavorites.propTypes = {
        movieId: PropTypes.number.isRequired,
    };

    const dispatch = useDispatch();
    const userId = useSelector(selectUserId());
    const favorites = useSelector(selectUserFavorites());
    const isFavorite = favorites.includes(movieId);

    const addToFavorites = () => {
        dispatch(userAddToFavorites(movieId));
        try {
            fetchMovieInUser(userId, {
                favorites: [...favorites, movieId],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromFavorites = () => {
        dispatch(userRemoveFromFavorites(movieId));
        try {
            fetchMovieInUser(userId, {
                favorites: favorites.filter((id) => id !== movieId),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleFavoriteCheckbox = () => {
        if (isFavorite) {
            removeFromFavorites();
        } else {
            addToFavorites();
        }
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    inputProps={{ "aria-label": "add to favorite" }}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={isFavorite}
                    onChange={handleFavoriteCheckbox}
                />
            }
            label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        />
    );
};

export default AddToFavorites;
