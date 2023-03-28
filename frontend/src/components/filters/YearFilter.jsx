import PropTypes from "prop-types";

const YearFilter = ({ setCurrentPage, setFilters }) => {
    YearFilter.propTypes = {
        setCurrentPage: PropTypes.func,
        setFilters: PropTypes.func,
    };

    const years = ["Toutes"];
    for (let i = 1980; i < 2000; i++) {
        years.push(i);
    }

    const handleYearChange = (e) => {
        setCurrentPage(1);
        if (e.target.value === "Toutes") {
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
        <fieldset className="year-filter">
            <legend>Année :</legend>
            <select id="date-filter" onChange={handleYearChange}>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </fieldset>
    );
};

export default YearFilter;
