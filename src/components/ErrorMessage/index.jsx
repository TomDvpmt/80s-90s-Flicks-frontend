import { Typography } from "@mui/material";

import theme from "../../theme/theme";

import PropTypes from "prop-types";

const ErrorMessage = ({ errorMessage }) => {
    ErrorMessage.propTypes = {
        errorMessage: PropTypes.string.isRequired,
    };

    return (
        <>
            {errorMessage && (
                <Typography paragraph color={theme.palette.warning.main}>
                    {errorMessage}
                </Typography>
            )}
        </>
    );
};

export default ErrorMessage;
