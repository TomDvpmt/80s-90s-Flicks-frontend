// import { useEffect, useReducer } from "react";
// import { useSelector } from "react-redux";

// import { selectPageLocation } from "../../features/pageSlice";

// import Pagination from "../Pagination";

// import { DASHBOARD_RESULTS_PER_PAGE } from "../../config/user";

import { Grid } from "@mui/material";

import PropTypes from "prop-types";

// const ACTIONS = {
//     setCurrentPage: "setCurrentPage",
//     setMoviesToDisplay: "setMoviesToDisplay",
// };

const MovieCardsGrid = ({ movies }) => {
    MovieCardsGrid.propTypes = {
        movies: PropTypes.array.isRequired,
    };

    // const page = useSelector(selectPageLocation);

    // const reducer = (state, { type, payload }) => {
    //     switch (type) {
    //         case "setCurrentPage":
    //             return { ...state, currentPage: payload };
    //         case "setMoviesToDisplay":
    //             return { ...state, moviesToDisplay: payload };
    //         default:
    //             throw new Error("Reducer: unknown action.");
    //     }
    // };

    // const [state, localDispatch] = useReducer(reducer, {
    //     numberOfPages: Math.ceil(movies.length / DASHBOARD_RESULTS_PER_PAGE),
    //     currentPage: 1,
    //     moviesToDisplay: [],
    // });

    // useEffect(() => {
    //     const moviesToDisplay = movies.slice(
    //         (state.currentPage - 1) * DASHBOARD_RESULTS_PER_PAGE,
    //         state.currentPage * DASHBOARD_RESULTS_PER_PAGE
    //     );

    //     localDispatch({
    //         type: ACTIONS.setMoviesToDisplay,
    //         payload: moviesToDisplay,
    //     });
    // }, [state.currentPage, movies]);

    return (
        <>
            <Grid
                container
                columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                spacing={{ xs: 2, md: 4, lg: 5 }}>
                {movies}
                {/* {page === "dashboard" ? state.moviesToDisplay : movies} */}
            </Grid>
            {/* {page === "dashboard" && state.numberOfPages > 1 && (
                <Box flexGrow="1" display="flex" justifyContent="center">
                    <Pagination reducer={{ ACTIONS, state, localDispatch }} />
                </Box>
            )} */}
        </>
    );
};

export default MovieCardsGrid;
