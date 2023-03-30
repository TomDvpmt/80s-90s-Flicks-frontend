import { useState, useEffect } from "react";

import { getGenres } from "../../assets/filters";

import PropTypes from "prop-types";

const GenreFilters = ({ activeGenres, setActiveGenres, setFilters }) => {
    GenreFilters.propTypes = {
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
                        <div key={genre.id} className="genre">
                            <label htmlFor={`genre-${genre.id}`}>
                                {genre.name}
                            </label>
                            <input
                                id={genre.id}
                                name={genre.name}
                                type="checkbox"
                                value={genre.name}
                                onChange={handleCheckBox}
                                checked={activeGenres.includes(genre.id)}
                            />
                        </div>
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
        <fieldset className="genres-filter">
            <legend>Genres : </legend>
            {allGenres}
            <button type="button" onClick={handleAllClick}>
                Tous
            </button>
            <button type="button" onClick={handleNoneClick}>
                Aucun
            </button>
        </fieldset>
    );
};

export default GenreFilters;
