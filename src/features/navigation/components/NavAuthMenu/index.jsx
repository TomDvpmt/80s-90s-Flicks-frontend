import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../../../features/user/userSlice";
import { selectPageLocation } from "../../navigationSlice";

import theme from "../../../../theme/theme";
import { Button } from "@mui/material";
import { PersonAddAlt1, Login } from "@mui/icons-material";

const NavAuthMenu = () => {
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

export default NavAuthMenu;
