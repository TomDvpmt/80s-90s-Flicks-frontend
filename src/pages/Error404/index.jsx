import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../features/user/userSlice";

import theme from "../../theme/theme";
import { Box } from "@mui/material";

const Error404 = () => {
    const language = useSelector(selectUserLanguage);

    return (
        <Box
            textAlign="center"
            sx={{
                "& *": {
                    color: theme.palette.primary.main,
                    fontWeight: "400",

                    "&:hover": {
                        textDecoration: "underline",
                    },
                },
            }}>
            <Link to="/">
                {theme.languages[language].pages.error404.backHomeLink}
            </Link>
        </Box>
    );
};

export default Error404;
