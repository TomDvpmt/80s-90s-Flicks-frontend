import { Link } from "react-router-dom";

import theme from "../../styles/theme";
import { Button } from "@mui/material";

const NavLoginMenu = () => {
    return (
        <Button
            component={Link}
            to="/login"
            sx={{ color: theme.palette.text.darkBg }}>
            Se connecter
        </Button>
    );
};

export default NavLoginMenu;
