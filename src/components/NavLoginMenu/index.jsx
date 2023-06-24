import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../features/userSlice";
import { selectPageLocation } from "../../features/pageSlice";

import theme from "../../styles/theme";
import { Button } from "@mui/material";
import { PersonAddAlt1, Login } from "@mui/icons-material";

const NavLoginMenu = () => {
    const language = useSelector(selectUserLanguage);
    const page = useSelector(selectPageLocation);

    return (
        <Button
            component={Link}
            to={page === "login" ? "/register" : "/login"}
            startIcon={page === "login" ? <PersonAddAlt1 /> : <Login />}
            sx={{ color: theme.palette.text.darkBg }}>
            {page === "login"
                ? theme.languages[language].navigation.register
                : theme.languages[language].navigation.login}
        </Button>
    );
};

export default NavLoginMenu;
