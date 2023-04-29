import { useSelector } from "react-redux";

import { selectPageLocation } from "../../app/selectors";

import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieHeading = ({ title, originalTitle }) => {
    MovieHeading.propTypes = {
        title: PropTypes.string.isRequired,
        originalTitle: PropTypes.string.isRequired,
    };

    const page = useSelector(selectPageLocation());

    const getTitleStyle = (page) => {
        switch (page) {
            case "home":
                return {
                    component: "h2",
                    variant: "h5",
                    margin: "4rem 0 2rem",
                    fontWeight: "700",
                };
            case "movie":
                return {
                    component: "h1",
                    variant: "h1",
                    margin: "4rem 0",
                    fontWeight: "inherit",
                };
            default:
                return {
                    component: "h3",
                    variant: "h5",
                    margin: "4rem 0 2rem",
                    fontWeight: "inherit",
                };
        }
    };

    const titleStyle = getTitleStyle(page);

    return (
        page && (
            <>
                <Typography
                    component={titleStyle.component}
                    variant={titleStyle.variant}
                    align="center"
                    sx={{
                        margin: titleStyle.margin,
                        fontWeight: titleStyle.fontWeight,
                    }}>
                    {title}
                </Typography>
                {page === "movie" && originalTitle !== undefined && (
                    <Typography
                        paragraph
                        align="center"
                        sx={{ fontStyle: "italic" }}>
                        {title !== originalTitle && `(${originalTitle})`}
                    </Typography>
                )}
            </>
        )
    );
};

export default MovieHeading;
