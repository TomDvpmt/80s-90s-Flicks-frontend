import { useDispatch, useSelector } from "react-redux";

import { clearAllFilters } from "../../movieSlice";
import { selectUserLanguage } from "../../../../features/user/userSlice";

import FilterGenre from "../FilterGenre";
import FilterYear from "../FilterYear";

import theme from "../../../../theme/theme";
import { Box, Paper, Button } from "@mui/material";

import PropTypes from "prop-types";

const FiltersHome = ({ reducer }) => {
    FiltersHome.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage);
    const dispatch = useDispatch();

    const handleFiltersClearAll = () => {
        if (!reducer.state.hasActiveFilters) return;
        dispatch(clearAllFilters());
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
                    <FilterYear reducer={reducer} />
                    <FilterGenre reducer={reducer} />
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
                        ? theme.languages[language].components.filtersHome
                              .clearFilters
                        : theme.languages[language].components.filtersHome
                              .noneActive}
                </Button>
            </Box>
        </Paper>
    );
};

export default FiltersHome;
