import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    userAddToFavorites,
    userRemoveFromFavorites,
} from "../../services/features/user";

import { selectUserFavorites } from "../../services/utils/selectors";

import { Checkbox, FormControlLabel } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import PropTypes from "prop-types";

const AddToFavorites = ({ movieId, fetchURI, fetchParams }) => {
    AddToFavorites.propTypes = {
        movieId: PropTypes.number,
        fetchURI: PropTypes.string,
        fetchParams: PropTypes.object,
    };

    const dispatch = useDispatch();
    const favorites = useSelector(selectUserFavorites());
    const isFavorite = favorites.includes(movieId);

    const addToFavorites = () => {
        dispatch(userAddToFavorites(movieId));
        try {
            fetch(fetchURI, {
                ...fetchParams,
                body: JSON.stringify({
                    favorites: [...favorites, movieId],
                }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromFavorites = () => {
        dispatch(userRemoveFromFavorites(movieId));
        try {
            fetch(fetchURI, {
                ...fetchParams,
                body: JSON.stringify({
                    favorites: favorites.filter((id) => id !== movieId),
                }),
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
