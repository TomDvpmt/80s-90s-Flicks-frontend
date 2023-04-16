import { useEffect } from "react";
import { setUserInfo } from "../../utils/requests";

import UserForm from "../../components/UserForm";

import { Box, Typography } from "@mui/material";

const Login = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);
    return (
        <Box component="main">
            <Typography component="h1" variant="h1">
                Connexion
            </Typography>
            <UserForm page="login" />
        </Box>
    );
};

export default Login;
