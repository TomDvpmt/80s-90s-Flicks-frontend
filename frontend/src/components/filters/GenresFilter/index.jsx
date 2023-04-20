import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    filtersSetActiveGenres,
    filtersConvertActiveGenresToFilter,
} from "../../../services/features/filters";
import { selectFiltersActiveGenres } from "../../../services/utils/selectors";

import { TMDB_API_KEY } from "../../../utils/config";

// import { getGenres } from "../../../utils/requests";

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ListItemText,
    OutlinedInput,
    Checkbox,
} from "@mui/material";

const GenresFilter = () => {
    const activeGenres = useSelector(selectFiltersActiveGenres());
    const dispatch = useDispatch();

    const [allGenres, setAllGenres] = useState([]);

    const convertIdsToNames = (arrayOfIds) => {
        return (
            allGenres.length > 0 &&
            arrayOfIds.map(
                (id) => allGenres.find((genre) => genre.id === id).name
            )
        );
    };

    useEffect(() => {
        const getGenres = async () => {
            try {
                const results = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=fr`,
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
        getGenres()
            .then((data) => {
                // exclude Documentary (99) and Television film (10770)
                const allGenres = data.filter(
                    (genre) => genre.id !== 99 && genre.id !== 10770
                );
                setAllGenres(allGenres);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleActiveGenresChange = (e) => {
        dispatch(filtersSetActiveGenres(e.target.value));
    };

    useEffect(() => {
        dispatch(filtersConvertActiveGenresToFilter(activeGenres));
    }, [activeGenres]);

    return (
        <FormControl component="fieldset">
            <InputLabel id="genres-list-label">Genres</InputLabel>
            <Select
                labelId="genres-list-label"
                label="Genres"
                id="genres-list"
                multiple
                value={activeGenres}
                onChange={handleActiveGenresChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => {
                    return (
                        allGenres.length > 0 &&
                        convertIdsToNames(selected).join(", ")
                    );
                }}>
                {allGenres.map((genre) => (
                    <MenuItem key={genre.id} id={genre.id} value={genre.id}>
                        <Checkbox checked={activeGenres.includes(genre.id)} />
                        <ListItemText primary={genre.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default GenresFilter;
