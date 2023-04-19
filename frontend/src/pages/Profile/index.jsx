import { useState } from "react";
import { useSelector } from "react-redux";

import UserForm from "../../components/UserForm";

import { selectUserInfo } from "../../services/utils/selectors";

import {
    Box,
    Paper,
    Typography,
    Button,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";

import theme from "../../assets/styles/theme";

const leftCellStyle = {
    textAlign: "right",
    fontWeight: "700",
};

const Profile = () => {
    const user = useSelector(selectUserInfo());

    const [showUpdateValidation, setShowUpdateValidation] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const handleUpdateUser = () => {
        setShowUpdateValidation(false);
        setShowUpdateForm((showUpdateForm) => !showUpdateForm);
    };

    return (
        <Box component="main" padding="1rem">
            <Typography component="h1" variant="h1">
                Mon Profil
            </Typography>

            <Box
                sx={{
                    maxWidth: theme.maxWidth.userForm,
                    margin: "0 auto 3rem",
                }}>
                {showUpdateValidation && (
                    <Typography color={theme.palette.success.main} mb="1rem">
                        Profil mis à jour.
                    </Typography>
                )}
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Nom d'utilisateur :
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Prénom :
                                </TableCell>
                                <TableCell>{user.firstName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>Nom :</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Adresse e-mail :
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: theme.margin.buttonTop.notSpaced }}
                        onClick={handleUpdateUser}>
                        Modifier les informations
                    </Button>
                </Box>
            </Box>

            {showUpdateForm && (
                <UserForm
                    page="profile"
                    userId={user.id}
                    defaultFormValues={{
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    }}
                    setShowUpdateForm={setShowUpdateForm}
                    setShowUpdateValidation={setShowUpdateValidation}
                />
            )}
        </Box>
    );
};

export default Profile;
