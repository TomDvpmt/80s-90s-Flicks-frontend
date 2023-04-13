import { useState } from "react";

import { Box, TextField, Button } from "@mui/material";

const SearchFilter = () => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
        // https://developers.themoviedb.org/3/search/search-movies
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* <fieldset>
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
            </fieldset> */}
            <TextField
                id="search"
                label="Title includes..."
                value={query}
                onChange={handleChange}
            />
            <Button type="submit" variant="contained">
                Search
            </Button>
        </Box>
    );
};

export default SearchFilter;
