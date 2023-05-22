import { Grid } from "@mui/material";

import PropTypes from "prop-types";

const MovieCardsGrid = ({ movies }) => {
    MovieCardsGrid.propTypes = {
        movies: PropTypes.array.isRequired,
    };

    return (
        <Grid
            container
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            spacing={{ xs: 2, md: 4, lg: 5 }}
            children={movies}
        />
    );
};

export default MovieCardsGrid;
