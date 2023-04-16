import { useEffect } from "react";
import { Link } from "react-router-dom";

import { setUserInfo } from "../../utils/requests";

import { Box, Typography } from "@mui/material";

import theme from "../../assets/styles/theme";

const Error404 = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);
    return (
        <Box component="main" padding="10rem 2rem">
            <Typography component="h1" variant="h1">
                Page introuvable.
            </Typography>
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
                <Link to="/">Revenir à l'accueil</Link>
            </Box>
        </Box>
    );
};

export default Error404;
