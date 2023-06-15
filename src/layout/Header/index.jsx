import Branding from "../../components/Branding";

import { Box } from "@mui/material";
import theme from "../../assets/styles/theme";

const Header = () => {
    return (
        <Box component="header" bgcolor={theme.palette.background.darkest}>
            <Branding location="header" />
        </Box>
    );
};

export default Header;
