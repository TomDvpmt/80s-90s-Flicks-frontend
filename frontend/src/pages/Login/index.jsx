import UserForm from "../../components/UserForm";

import { Box, Typography } from "@mui/material";

const Login = () => {
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
