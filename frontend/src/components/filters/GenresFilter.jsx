import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import store from "../../utils/store";
import {
    filtersAddActiveGenre,
    filtersRemoveActiveGenre,
    filtersClearActiveGenres,
    filtersConvertActiveGenresToFilter,
} from "../../features/filters";
import { selectFiltersActiveGenres } from "../../utils/selectors";

import {
    FormControl,
    FormLabel,
    FormGroup,
    Checkbox,
    FormControlLabel,
    Button,
} from "@mui/material";

import { getGenres } from "../../assets/filters";

const GenresFilter = () => {
    const [allGenres, setAllGenres] = useState([]);

    const activeGenres = useSelector(selectFiltersActiveGenres());
    console.log(activeGenres);

    const handleCheckBox = (e) => {
        const genreId = parseInt(e.target.id);

        activeGenres.includes(genreId)
            ? store.dispatch(filtersRemoveActiveGenre(genreId))
            : store.dispatch(filtersAddActiveGenre(genreId));
    };

    const handleNoneClick = () => {
        store.dispatch(filtersClearActiveGenres());
    };

    useEffect(() => {
        getGenres()
            .then((data) =>
                setAllGenres(
                    data.map((genre) => (
                        <FormControlLabel
                            key={genre.id}
                            control={
                                <Checkbox
                                    id={`${genre.id}`}
                                    name={genre.name}
                                    onChange={handleCheckBox}
                                    checked={activeGenres.includes(genre.id)}
                                    value={genre.name}
                                />
                            }
                            label={genre.name}
                        />
                    ))
                )
            )
            .catch((error) => console.log(error));

        store.dispatch(filtersConvertActiveGenresToFilter(activeGenres));
    }, [activeGenres]);
    return (
        <FormControl component="fieldset">
            <FormLabel>Genres : </FormLabel>
            <FormGroup>{allGenres}</FormGroup>
            <Button variant="outlined" onClick={handleNoneClick}>
                Aucun
            </Button>
        </FormControl>
    );
};

export default GenresFilter;
