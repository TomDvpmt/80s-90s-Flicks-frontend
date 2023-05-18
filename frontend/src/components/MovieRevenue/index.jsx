import { displayBigNumber } from "../../utils/utils";

import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieRevenue = ({ movieLangData, revenue }) => {
    MovieRevenue.propTypes = {
        movieLangData: PropTypes.shape({
            revenue: PropTypes.string.isRequired,
            unavailable: PropTypes.string.isRequired,
        }),
        revenue: PropTypes.number.isRequired,
    };

    return (
        <Typography paragraph>
            <Typography component="span" fontWeight="700">
                {movieLangData.revenue}
            </Typography>{" "}
            {revenue === null || revenue === 0
                ? movieLangData.unavailable
                : "$ " + displayBigNumber(revenue)}
        </Typography>
    );
};

export default MovieRevenue;
