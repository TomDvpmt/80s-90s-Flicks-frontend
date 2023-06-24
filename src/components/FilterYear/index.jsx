import { useSelector, useDispatch } from "react-redux";

import { setYear, selectFiltersYear } from "../../features/filtersSlice";
import { selectUserLanguage } from "../../features/userSlice";

import theme from "../../styles/theme";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import PropTypes from "prop-types";

const FilterYear = ({ reducer }) => {
    FilterYear.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage);
    const yearOption = useSelector(selectFiltersYear);
    const dispatch = useDispatch();

    const years = ["1980-1999"];
    for (let i = 1980; i < 2000; i++) {
        years.push(i);
    }

    const handleYearChange = (e) => {
        reducer.localDispatch({
            type: reducer.ACTIONS.setCurrentPage,
            payload: 1,
        });
        dispatch(setYear(e.target.value));
    };

    return (
        <FormControl component="fieldset">
            <InputLabel id="year-filter">
                {theme.languages[language].components.filterYear.label}
            </InputLabel>
            <Select
                labelId="year-filter"
                label="Période"
                onChange={handleYearChange}
                value={yearOption}>
                {years.map((year) => (
                    <MenuItem key={year} value={year} dense>
                        {year}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterYear;
