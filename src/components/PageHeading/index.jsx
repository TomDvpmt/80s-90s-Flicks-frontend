import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const PageHeading = ({ text }) => {
    PageHeading.propTypes = {
        text: PropTypes.string.isRequired,
    };

    return (
        <Typography component="h1" variant="h1">
            {text}
        </Typography>
    );
};

export default PageHeading;
