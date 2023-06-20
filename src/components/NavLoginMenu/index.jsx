import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectPageLocation } from "../../features/pageSlice";

import theme from "../../styles/theme";
import { Button } from "@mui/material";

const NavLoginMenu = () => {
    const page = useSelector(selectPageLocation);
    return (
        <Button
            component={Link}
            to={page === "login" ? "/register" : "/login"}
            sx={{ color: theme.palette.text.darkBg }}>
            {page === "login" ? "Créer un compte" : "Se connecter"}
        </Button>
    );
};

export default NavLoginMenu;
