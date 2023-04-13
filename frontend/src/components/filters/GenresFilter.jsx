import { useState, useEffect } from "react";

import {
    FormControl,
    FormLabel,
    FormGroup,
    Checkbox,
    FormControlLabel,
    Button,
    ButtonGroup,
} from "@mui/material";

import { getGenres } from "../../assets/filters";

import PropTypes from "prop-types";

const GenresFilter = ({ activeGenres, setActiveGenres, setFilters }) => {
    GenresFilter.propTypes = {
        activeGenres: PropTypes.array,
        setActiveGenres: PropTypes.func,
        setFilters: PropTypes.func,
    };

    const [allGenres, setAllGenres] = useState([]);

    const handleCheckBox = (e) => {
        const genreId = parseInt(e.target.id);
        setActiveGenres((activeGenres) =>
            activeGenres.includes(genreId)
                ? activeGenres.filter((element) => element !== genreId)
                : [...activeGenres, genreId]
        );
    };

    const handleAllClick = () => {
        getGenres()
            .then((data) => setActiveGenres(data.map((genre) => genre.id)))
            .catch((error) => console.log(error));
    };

    const handleNoneClick = () => {
        setActiveGenres([]);
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

        setFilters((filters) =>
            filters.map((filter) =>
                filter.name === "withGenres"
                    ? { ...filter, value: activeGenres.toString() }
                    : filter
            )
        );
    }, [activeGenres, setFilters]);
    return (
        <FormControl component="fieldset">
            <FormLabel>Genres : </FormLabel>
            <FormGroup>{allGenres}</FormGroup>
            <ButtonGroup sx={{ justifyContent: "center" }}>
                <Button onClick={handleAllClick}>Tous</Button>
                <Button onClick={handleNoneClick}>Aucun</Button>
            </ButtonGroup>
        </FormControl>
    );
};

export default GenresFilter;
