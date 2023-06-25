import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../../user/userSlice";

import { displayBigNumber } from "../../../../utils/helpers";

import theme from "../../../../theme/theme";
import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieRevenue = ({ revenue }) => {
    MovieRevenue.propTypes = {
        revenue: PropTypes.number.isRequired,
    };

    const language = useSelector(selectUserLanguage);

    return (
        <Typography paragraph>
            <Typography component="span" fontWeight="700">
                {theme.languages[language].components.movieRevenue}
            </Typography>{" "}
            {revenue === null || revenue === 0
                ? theme.languages[language].global.noData
                : "$ " + displayBigNumber(revenue)}
        </Typography>
    );
};

export default MovieRevenue;
