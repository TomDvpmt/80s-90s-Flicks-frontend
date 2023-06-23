import { useSelector } from "react-redux";

import { selectPageLocation } from "../../features/pageSlice";

import { Typography } from "@mui/material";
import theme from "../../styles/theme";

import PropTypes from "prop-types";

const MovieHeading = ({ title, originalTitle }) => {
    MovieHeading.propTypes = {
        title: PropTypes.string.isRequired,
        originalTitle: PropTypes.string.isRequired,
    };

    const page = useSelector(selectPageLocation);

    const getTitleStyle = (page) => {
        switch (page) {
            case "home":
                return {
                    component: "h2",
                    variant: "h5",
                    margin: "0 0 4rem",
                    fontWeight: "700",
                    color: theme.palette.text.bgDark,
                };
            case "movie":
                return {
                    component: "h1",
                    variant: "h1",
                    margin: { xs: "4rem 0 1rem", md: "1rem 0" },
                    fontWeight: "700",
                    color: theme.palette.brandingWarm.main,
                };
            case "dashboard":
                return {
                    component: "h3",
                    variant: "h5",
                    margin: "0 0 4rem",
                    fontWeight: "inherit",
                    color: theme.palette.text.bgDark,
                };
            default:
                return {
                    component: "h3",
                    variant: "h5",
                    margin: "4rem 0 2rem",
                    fontWeight: "inherit",
                    color: "inherit",
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
                        color: titleStyle.color,
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
