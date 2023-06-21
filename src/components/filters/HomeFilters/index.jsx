import { useDispatch } from "react-redux";

import { clearAll } from "../../../features/filtersSlice";

import GenresFilter from "../GenresFilter";
import YearFilter from "../YearFilter";

import { Box, Paper, Button } from "@mui/material";

import PropTypes from "prop-types";

const HomeFilters = ({ reducer }) => {
    HomeFilters.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const dispatch = useDispatch();

    const handleFiltersClearAll = () => {
        if (!reducer.state.hasActiveFilters) return;
        dispatch(clearAll());
        reducer.localDispatch({
            type: reducer.ACTIONS.setCurrentPage,
            payload: 1,
        });
    };

    return (
        <Paper
            elevation={2}
            sx={{
                margin: "2rem 0",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        "& *": { flex: "1" },
                    }}>
                    <YearFilter reducer={reducer} />
                    <GenresFilter reducer={reducer} />
                </Box>
                <Button
                    variant="outlined"
                    onClick={handleFiltersClearAll}
                    disabled={!reducer.state.hasActiveFilters}
                    sx={{
                        maxWidth: "max-content",
                        margin: "auto",
                    }}>
                    {reducer.state.hasActiveFilters
                        ? "Supprimer les filtres"
                        : "Aucun filtre actif"}
                </Button>
            </Box>
        </Paper>
    );
};

export default HomeFilters;
