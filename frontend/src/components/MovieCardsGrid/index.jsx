import { useSelector } from "react-redux";

import { selectPageLocation } from "../../app/selectors";

import { Grid } from "@mui/material";

import theme from "../../assets/styles/theme";

const MovieCardsGrid = ({ movies }) => {
    const page = useSelector(selectPageLocation());

    return (
        <Grid
            container
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            spacing={{ xs: 2, md: 4, lg: 5 }}
            // bgcolor={page === "home" && theme.palette.secondary.darkest}
            children={movies}
        />
    );
};

export default MovieCardsGrid;
