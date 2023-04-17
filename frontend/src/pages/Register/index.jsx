import UserForm from "../../components/UserForm";

import { Box, Typography } from "@mui/material";

const Register = () => {
    return (
        <Box component="main">
            <Typography component="h1" variant="h1">
                Créer un compte
            </Typography>
            <UserForm page="register" />
        </Box>
    );
};

export default Register;
