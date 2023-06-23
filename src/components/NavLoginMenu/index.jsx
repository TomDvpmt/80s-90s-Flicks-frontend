import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectPageLocation } from "../../features/pageSlice";

import theme from "../../styles/theme";
import { Button } from "@mui/material";
import { PersonAddAlt1, Login } from "@mui/icons-material";

const NavLoginMenu = () => {
    const page = useSelector(selectPageLocation);
    return (
        <Button
            component={Link}
            to={page === "login" ? "/register" : "/login"}
            startIcon={page === "login" ? <PersonAddAlt1 /> : <Login />}
            sx={{ color: theme.palette.text.darkBg }}>
            {page === "login" ? "Créer un compte" : "Connexion"}
        </Button>
    );
};

export default NavLoginMenu;
