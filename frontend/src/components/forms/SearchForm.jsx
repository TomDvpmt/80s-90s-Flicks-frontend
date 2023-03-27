import { useState } from "react";

const SearchForm = () => {
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search"></label>
            <input
                id="search"
                type="text"
                placeholder="Entrez votre recherche"
                value={search}
                onChange={handleChange}
            />
            <button type="submit">Chercher</button>
        </form>
    );
};

export default SearchForm;
