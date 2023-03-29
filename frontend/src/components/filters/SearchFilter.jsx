import { useState } from "react";

const SearchFilter = () => {
    const [query, setQuery] = useState("");
    const handleChange = (e) => {
        setQuery(e.target.value);
        // https://developers.themoviedb.org/3/search/search-movies
    };

    return (
        <form className="search-filter">
            <fieldset>
                <legend>Recherche directe</legend>
                <label>Films dont le titre contient : </label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={query}
                    onChange={handleChange}
                />
                <button type="submit">Chercher</button>
            </fieldset>
        </form>
    );
};

export default SearchFilter;
