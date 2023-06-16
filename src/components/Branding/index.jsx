import { Link } from "react-router-dom";

import logo from "../../assets/logo/flix-logo.png";

import theme from "../../assets/styles/theme";
import { Box, useMediaQuery } from "@mui/material";

import PropTypes from "prop-types";

const Branding = ({ location }) => {
    Branding.propTypes = {
        location: PropTypes.string.isRequired,
    };

    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const headerWidth = isSmallScreen ? "500" : "250";

    return (
        <Box
            component="div"
            sx={{
                pt: location === "header" && isSmallScreen ? "8rem" : "2rem",
                pb: location === "header" && isSmallScreen ? "8rem" : "2rem",
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
        </Box>
    );
};

export default Branding;
