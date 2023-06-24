import { useSelector } from "react-redux";

import { selectPageLocation } from "../../features/pageSlice";

import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const PageHeading = ({ text }) => {
    PageHeading.propTypes = {
        text: PropTypes.string.isRequired,
    };

    const page = useSelector(selectPageLocation);

    return (
        <Typography
            component="h1"
            variant="h1"
            textTransform={page === "error404" ? "none" : "uppercase"}>
            {text}
        </Typography>
    );
};

export default PageHeading;
