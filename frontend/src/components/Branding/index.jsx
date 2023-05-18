import { Link } from "react-router-dom";

import { Box } from "@mui/material";

import logo from "../../assets/80s-90s_Branding.png";

import PropTypes from "prop-types";

const Branding = ({ location }) => {
    Branding.propTypes = {
        location: PropTypes.string.isRequired,
    };
    return (
        <Box
            component="div"
            sx={{
                pt: location === "header" ? "8rem" : "2rem",
                pb: location === "header" ? "8rem" : "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Link to="/">
                <img
                    src={logo}
                    alt="Logo"
                    width={location === "header" ? "300" : "300"}
                />
            </Link>
        </Box>
    );
};

export default Branding;
