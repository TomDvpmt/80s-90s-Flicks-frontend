import { Box } from "@mui/material";

import PropTypes from "prop-types";

const DashboardTabPanel = ({ children, index, value }) => {
    DashboardTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            flexGrow="1">
            {value === index && <Box>{children}</Box>}
        </Box>
    );
};

export default DashboardTabPanel;
