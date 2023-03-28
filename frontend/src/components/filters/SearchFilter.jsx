import { useState } from "react";
import PropTypes from "prop-types";

const SearchFilter = ({ setFilters }) => {
    SearchFilter.propTypes = {
        setFilters: PropTypes.func,
    };

    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <fieldset className="search-filter">
            <legend>Recherche</legend>
            <label>Films dont le titre ou la description contient : </label>
            <input
                type="text"
                name="search"
                id="search"
                value={query}
                onChange={handleChange}
            />
        </fieldset>
    );
};

export default SearchFilter;
