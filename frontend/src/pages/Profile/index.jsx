import { useState } from "react";
import { useSelector } from "react-redux";

import UserForm from "../../components/UserForm";

import {
    selectUserUsername,
    selectUserFirstName,
    selectUserLastName,
    selectUserEmail,
    selectUserId,
} from "../../services/utils/selectors";

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
    const userId = useSelector(selectUserId());
    const username = useSelector(selectUserUsername());
    const firstName = useSelector(selectUserFirstName());
    const lastName = useSelector(selectUserLastName());
    const email = useSelector(selectUserEmail());

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
                                <TableCell>{username}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Prénom :
                                </TableCell>
                                <TableCell>{firstName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>Nom :</TableCell>
                                <TableCell>{lastName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Adresse e-mail :
                                </TableCell>
                                <TableCell>{email}</TableCell>
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
                    userId={userId}
                    defaultFormValues={{
                        username,
                        email,
                        firstName,
                        lastName,
                    }}
                    setShowUpdateForm={setShowUpdateForm}
                    setShowUpdateValidation={setShowUpdateValidation}
                />
            )}
        </Box>
    );
};

export default Profile;
