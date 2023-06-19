import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    setUserInfo,
    selectUserAvatarUrl,
    selectUserUsername,
    selectUserFirstName,
    selectUserLastName,
    selectUserEmail,
    selectUserId,
} from "../../features/userSlice";

import UserAvatarUpdateDialog from "../../components/UserAvatarUpdateDialog";
import UsernameInput from "../../components/form-fields/UsernameInput";
import EmailInput from "../../components/form-fields/EmailInput";
import FirstNameInput from "../../components/form-fields/FirstNameInput";
import LastNameInput from "../../components/form-fields/LastNameInput";
import ValidationMessage from "../../components/ValidationMessage";
import ErrorMessage from "../../components/ErrorMessage";
import DeleteAccountDialog from "../../components/DeleteAccountDialog";

import { BASE_API_URI } from "../../utils/config";

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
    Avatar,
    IconButton,
    Badge,
} from "@mui/material";
import { Settings } from "@mui/icons-material";

import theme from "../../styles/theme";

const Profile = () => {
    const dispatch = useDispatch();

    const avatarUrl = useSelector(selectUserAvatarUrl);
    const userId = useSelector(selectUserId);

    const prevUsername = useSelector(selectUserUsername);
    const prevEmail = useSelector(selectUserEmail);
    const prevFirstName = useSelector(selectUserFirstName);
    const prevLastName = useSelector(selectUserLastName);

    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [showUpdateValidation, setShowUpdateValidation] = useState(false);
    const [showUserAvatarUpdateDialog, setShowUserAvatarUpdateDialog] =
        useState(false);
    const [showUpdateInfosForm, setShowUpdateInfosForm] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        setNewUsername(prevUsername);
        setNewEmail(prevEmail);
        setNewFirstName(prevFirstName);
        setNewLastName(prevLastName);
    }, [prevUsername, prevEmail, prevFirstName, prevLastName]);

    const handleUpdateInfos = () => {
        setShowUpdateValidation(false);
        setErrorMessage("");
        setShowUpdateInfosForm((showUpdateInfosForm) => !showUpdateInfosForm);
    };

    const handleDeleteClick = () => {
        setShowDeleteDialog((show) => !show);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            prevUsername === newUsername &&
            prevEmail === newEmail &&
            prevFirstName === newFirstName &&
            prevLastName === newLastName
        ) {
            setShowUpdateInfosForm(false);
            return;
        }

        const response = await fetch(`${BASE_API_URI}/API/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: newUsername,
                email: newEmail,
                firstName: newFirstName,
                lastName: newLastName,
            }),
            credentials: "include",
        });
        const data = await response.json();
        if (data.statusCode >= 400) {
            setErrorMessage(data.message);
            return;
        }

        dispatch(
            setUserInfo({
                id: userId,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            })
        );
        setShowUpdateValidation(true);
        setShowUpdateInfosForm(false);
    };

    const leftCellStyle = {
        textAlign: "right",
        fontWeight: "700",
    };

    return (
        <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems={{ xs: "center", md: "flex-start" }}
            gap={{ xs: "2rem", md: "4rem" }}>
            <Box>
                <Badge
                    badgeContent={
                        <IconButton
                            onClick={() => setShowUserAvatarUpdateDialog(true)}>
                            <Settings />
                        </IconButton>
                    }
                    sx={{
                        "& .MuiBadge-badge": {
                            top: "inherit",
                            bottom: "0",
                        },
                    }}>
                    <Avatar
                        sx={{
                            width: theme.maxWidth.profileAvatar,
                            height: theme.maxWidth.profileAvatar,
                        }}
                        src={avatarUrl}
                        alt="Avatar"
                    />
                </Badge>
            </Box>

            <UserAvatarUpdateDialog
                showUserAvatarUpdateDialog={showUserAvatarUpdateDialog}
                setShowUserAvatarUpdateDialog={setShowUserAvatarUpdateDialog}
            />
            <Box>
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
                                    <TableCell sx={leftCellStyle}>
                                        Nom :
                                    </TableCell>
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
                            variant={
                                showUpdateInfosForm ? "outlined" : "contained"
                            }
                            size="small"
                            sx={{
                                mt: theme.margin.buttonTop.notSpaced,
                                color: showUpdateInfosForm
                                    ? "inherit"
                                    : "white",
                            }}
                            onClick={handleUpdateInfos}>
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

                <Collapse in={showUpdateInfosForm}>
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
                                    color: "white",
                                }}>
                                Enregistrer
                            </Button>
                        </Box>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    );
};

export default Profile;
