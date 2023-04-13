import { useState } from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import PropTypes from "prop-types";

const YearFilter = ({ setCurrentPage, setFilters }) => {
    YearFilter.propTypes = {
        setCurrentPage: PropTypes.func,
        setFilters: PropTypes.func,
    };

    const [yearOption, setYearOption] = useState("All");

    const years = ["All"];
    for (let i = 1980; i < 2000; i++) {
        years.push(i);
    }

    const handleYearChange = (e) => {
        setYearOption(e.target.value);
        setCurrentPage(1);
        if (e.target.value === "All") {
            setFilters((filters) =>
                filters.map((filter) => {
                    if (filter.name === "primaryReleaseYear")
                        return { ...filter, value: "" };
                    else if (filter.name === "allYearsMin")
                        return { ...filter, value: "1980-01-01" };
                    else if (filter.name === "allYearsMax")
                        return { ...filter, value: "1999-12-31" };
                    else return filter;
                })
            );
        } else {
            setFilters((filters) =>
                filters.map((filter) => {
                    if (["allYearsMin", "allYearsMax"].includes(filter.name))
                        return { ...filter, value: "" };
                    else if (filter.name === "primaryReleaseYear")
                        return { ...filter, value: e.target.value };
                    else return filter;
                })
            );
        }
    };
    return (
        <FormControl>
            <InputLabel id="year-filer">Year :</InputLabel>
            <Select
                labelId="year-filter"
                label="Year"
                onChange={handleYearChange}
                value={yearOption}>
                {years.map((year) => (
                    <MenuItem key={year} value={year}>
                        {year}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default YearFilter;
