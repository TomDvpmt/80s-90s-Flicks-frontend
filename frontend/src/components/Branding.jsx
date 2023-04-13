import { Box } from "@mui/material";
import logo from "../assets/80s-90s_Branding.png";

import PropTypes from "prop-types";

const Branding = ({ location }) => {
    Branding.propTypes = {
        location: PropTypes.string,
    };
    return (
        <Box
            component="div"
            sx={{
                pt: "8rem",
                pb: "8rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <img
                src={logo}
                alt="Logo"
                width={location === "header" ? "500" : "300"}
            />
        </Box>
    );
};

export default Branding;
