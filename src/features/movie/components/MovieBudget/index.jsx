import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../../../features/user/userSlice";

import { displayBigNumber } from "../../../../utils/helpers";

import theme from "../../../../theme/theme";
import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieBudget = ({ budget }) => {
    MovieBudget.propTypes = {
        budget: PropTypes.number.isRequired,
    };

    const language = useSelector(selectUserLanguage);

    return (
        budget !== null && (
            <Typography paragraph>
                <Typography component="span" fontWeight="700">
                    {theme.languages[language].components.movieBudget}
                </Typography>{" "}
                {!budget || budget === 0
                    ? theme.languages[language].global.noData
                    : "$ " + displayBigNumber(budget)}
            </Typography>
        )
    );
};

export default MovieBudget;
