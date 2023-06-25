import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    setActiveGenres,
    convertActiveGenresToFilter,
    selectFiltersActiveGenres,
} from "../../movieSlice";
import { selectUserLanguage } from "../../../../features/user/userSlice";

import {
    TMDB_API_KEY,
    TMDB_BASE_URI,
    TMDB_EXCLUDED_GENRES,
} from "../../../../config/APIs";

import theme from "../../../../theme/theme";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ListItemText,
    OutlinedInput,
    Checkbox,
} from "@mui/material";

import PropTypes from "prop-types";

const FilterGenre = ({ reducer }) => {
    FilterGenre.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage);
    const activeGenres = useSelector(selectFiltersActiveGenres);
    const dispatch = useDispatch();

    const [allGenres, setAllGenres] = useState([]);

    const convertIdsToNames = (arrayOfIds) => {
        return (
            allGenres.length > 0 &&
            arrayOfIds.map(
                (id) => allGenres.find((genre) => genre.id === id)?.name
            )
        );
    };

    const getGenres = async () => {
        try {
            const results = await fetch(
                `${TMDB_BASE_URI}/genre/movie/list?api_key=${TMDB_API_KEY}&language=fr`,
                {
                    method: "GET",
                }
            );
            const data = await results.json();
            return data.genres;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getGenres()
            .then((data) => {
                const genres = data.filter(
                    (genre) => !TMDB_EXCLUDED_GENRES.includes(genre.id)
                );
                setAllGenres(genres);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleActiveGenresChange = (e) => {
        dispatch(setActiveGenres(e.target.value));
        reducer.localDispatch({
            type: reducer.ACTIONS.setCurrentPage,
            payload: 1,
        });
    };

    useEffect(() => {
        dispatch(convertActiveGenresToFilter(activeGenres));
    }, [activeGenres, dispatch]);

    return (
        <FormControl component="fieldset">
            <InputLabel id="genres-list-label">
                {theme.languages[language].components.filterGenre.label}
            </InputLabel>
            <Select
                labelId="genres-list-label"
                label="Genres"
                id="genres-list"
                multiple
                value={activeGenres}
                onChange={handleActiveGenresChange}
                input={<OutlinedInput label="Genres" />}
                renderValue={(selected) => {
                    return (
                        allGenres.length > 0 &&
                        convertIdsToNames(selected).join(", ")
                    );
                }}>
                {allGenres.map((genre) => (
                    <MenuItem
                        key={genre.id}
                        id={genre.id}
                        value={genre.id}
                        dense>
                        <Checkbox
                            checked={activeGenres.includes(genre.id)}
                            sx={{ pt: "0", pb: "0" }}
                        />
                        <ListItemText primary={genre.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterGenre;
