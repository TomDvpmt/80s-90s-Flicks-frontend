import { useState } from "react";
import { useSelector } from "react-redux";

import UserForm from "../../components/UserForm";
import ValidationMessage from "../../components/ValidationMessage";

import {
    selectUserUsername,
    selectUserFirstName,
    selectUserLastName,
    selectUserEmail,
    selectUserId,
} from "../../app/selectors";

import {
    Box,
    Paper,
    Button,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    // Collapse,
} from "@mui/material";

import theme from "../../assets/styles/theme";

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

    const leftCellStyle = {
        textAlign: "right",
        fontWeight: "700",
    };

    return (
        <>
            <Box
                sx={{
                    maxWidth: theme.maxWidth.userForm,
                    margin: "0 auto 3rem",
                }}>
                {showUpdateValidation && (
                    <ValidationMessage text="Profil mis à jour." />
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
                        variant={showUpdateForm ? "outlined" : "contained"}
                        sx={{ mt: theme.margin.buttonTop.notSpaced }}
                        onClick={handleUpdateUser}>
                        Modifier les informations
                    </Button>
                </Box>
            </Box>

            {/* <Collapse
                in={showUpdateForm}
                children={
                    <UserForm
                        userId={userId}
                        setShowUpdateForm={setShowUpdateForm}
                        setShowUpdateValidation={setShowUpdateValidation}
                    />
                }
            /> */}
            {showUpdateForm && (
                <UserForm
                    userId={userId}
                    setShowUpdateForm={setShowUpdateForm}
                    setShowUpdateValidation={setShowUpdateValidation}
                />
            )}
        </>
    );
};

export default Profile;
