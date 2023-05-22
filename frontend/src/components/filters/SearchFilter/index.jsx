import { useState } from "react";

import { Box, TextField, Button } from "@mui/material";

const SearchFilter = () => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // https://developers.themoviedb.org/3/search/search-movies
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <TextField
                id="search"
                label="Titre (complet ou partiel)"
                value={query}
                onChange={handleChange}
            />
            <Button type="submit" variant="contained">
                Chercher
            </Button>
        </Box>
    );
};

export default SearchFilter;
