import { useSelector } from "react-redux";

import { selectPageLocation } from "../../services/utils/selectors";

import { Grid } from "@mui/material";

import theme from "../../assets/styles/theme";

const MovieCardsGrid = ({ movies }) => {
    const page = useSelector(selectPageLocation());

    return (
        <Grid
            container
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={{ xs: 2, md: 6 }}
            bgcolor={page === "home" && theme.palette.secondary.darkest}>
            {movies}
        </Grid>
    );
};

export default MovieCardsGrid;
