import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../features/userSlice";

import logo from "../../assets/logo/Flixx-logo.webp";

import theme from "../../styles/theme";
import { Box, Typography, useMediaQuery } from "@mui/material";

import PropTypes from "prop-types";

const Branding = ({ location }) => {
    Branding.propTypes = {
        location: PropTypes.string.isRequired,
    };

    const language = useSelector(selectUserLanguage);

    const isWiderThanSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const isWiderThanMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

    let headerWidth = "250px";

    if (isWiderThanSmallScreen) {
        headerWidth = "350px";
    }
    if (isWiderThanMediumScreen) {
        headerWidth = "500px";
    }

    return (
        <Box
            component="div"
            sx={{
                gridColumn: "1 / 3",
                pt:
                    location === "header" && isWiderThanSmallScreen
                        ? "6rem"
                        : "2rem",
                pb:
                    location === "header" && isWiderThanSmallScreen
                        ? "6rem"
                        : "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Link to="/">
                <img
                    src={logo}
                    alt="Logo"
                    width={location === "header" ? headerWidth : "250"}
                />
            </Link>
            {location === "header" && (
                <Typography
                    variant="h4"
                    p="0 1rem"
                    color={theme.palette.text.darkBg}
                    fontWeight="500"
                    fontStyle="italic"
                    textAlign="center"
                    sx={{ textShadow: "2px 2px 2px black" }}>
                    {theme.languages[language].components.branding.tagline}
                </Typography>
            )}
        </Box>
    );
};

export default Branding;
