import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userSetInfo } from "../../features/user";

import UsernameInput from "../../components/form-fields/UsernameInput";
import EmailInput from "../../components/form-fields/EmailInput";
import FirstNameInput from "../../components/form-fields/FirstNameInput";
import LastNameInput from "../../components/form-fields/LastNameInput";
import ValidationMessage from "../../components/ValidationMessage";
import ErrorMessage from "../../components/ErrorMessage";
import DeleteAccountDialog from "../../components/DeleteAccountDialog";

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
    Collapse,
} from "@mui/material";

import theme from "../../assets/styles/theme";

const Profile = () => {
    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();

    const userId = useSelector(selectUserId());
    const prevUsername = useSelector(selectUserUsername());
    const prevEmail = useSelector(selectUserEmail());
    const prevFirstName = useSelector(selectUserFirstName());
    const prevLastName = useSelector(selectUserLastName());

    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [showUpdateValidation, setShowUpdateValidation] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        setNewUsername(prevUsername);
        setNewEmail(prevEmail);
        setNewFirstName(prevFirstName);
        setNewLastName(prevLastName);
    }, [prevUsername, prevEmail, prevFirstName, prevLastName]);

    const handleUpdateUser = () => {
        setShowUpdateValidation(false);
        setErrorMessage("");
        setShowUpdateForm((showUpdateForm) => !showUpdateForm);
    };

    const handleDeleteClick = () => {
        setShowDeleteDialog((show) => !show);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If default values and input values are the same, close the form
        if (
            prevUsername === newUsername &&
            prevEmail === newEmail &&
            prevFirstName === newFirstName &&
            prevLastName === newLastName
        ) {
            setShowUpdateForm(false);
            return;
        }

        const response = await fetch(`/API/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify({
                username: newUsername,
                email: newEmail,
                firstName: newFirstName,
                lastName: newLastName,
            }),
        });
        const data = await response.json();
        if (data.statusCode >= 400) {
            setErrorMessage(data.message);
            return;
        }

        dispatch(
            userSetInfo({
                id: userId,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            })
        );
        setShowUpdateValidation(true);
        setShowUpdateForm(false);
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
                                <TableCell>{prevUsername}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Adresse e-mail :
                                </TableCell>
                                <TableCell>{prevEmail}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>
                                    Prénom :
                                </TableCell>
                                <TableCell>{prevFirstName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={leftCellStyle}>Nom :</TableCell>
                                <TableCell>{prevLastName}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: ".5rem",
                    }}>
                    <Button
                        type="button"
                        variant={showUpdateForm ? "outlined" : "contained"}
                        size="small"
                        sx={{ mt: theme.margin.buttonTop.notSpaced }}
                        onClick={handleUpdateUser}>
                        Modifier les informations
                    </Button>
                    <Button
                        type="button"
                        variant="text"
                        size="small"
                        sx={{
                            mt: theme.margin.buttonTop.notSpaced,
                        }}
                        onClick={handleDeleteClick}>
                        Supprimer le compte
                    </Button>
                    <DeleteAccountDialog
                        showDeleteDialog={showDeleteDialog}
                        setShowDeleteDialog={setShowDeleteDialog}
                        setErrorMessage={setErrorMessage}
                    />
                </Box>
            </Box>

            <Collapse in={showUpdateForm}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        maxWidth: theme.maxWidth.userForm,
                        margin: "0 auto 3rem",
                    }}>
                    <ErrorMessage errorMessage={errorMessage} />
                    <UsernameInput
                        username={newUsername}
                        setUsername={setNewUsername}
                        setErrorMessage={setErrorMessage}
                    />
                    <EmailInput
                        email={newEmail}
                        setEmail={setNewEmail}
                        setErrorMessage={setErrorMessage}
                    />
                    <FirstNameInput
                        firstName={newFirstName}
                        setFirstName={setNewFirstName}
                        setErrorMessage={setErrorMessage}
                    />
                    <LastNameInput
                        lastName={newLastName}
                        setLastName={setNewLastName}
                        setErrorMessage={setErrorMessage}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                margin: `${theme.margin.buttonTop.spaced} 0`,
                            }}>
                            Enregistrer
                        </Button>
                    </Box>
                </Box>
            </Collapse>
        </>
    );
};

export default Profile;
