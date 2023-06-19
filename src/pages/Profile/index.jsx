import { useEffect, useReducer } from "react";
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

import { API_BASE_URI } from "../../utils/config";

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

const ACTIONS = {
    setUsername: "setUsername",
    setShowUsernameError: "setShowUsernameError",
    setEmail: "setEmail",
    setShowEmailError: "setShowEmailError",
    setFirstName: "setFirstName",
    setShowFirstNameError: "setShowFirstNameError",
    setLastName: "setLastName",
    setShowLastNameError: "setShowLastNameError",
    setShowUpdateValidation: "setShowUpdateValidation",
    setShowUserAvatarUpdateDialog: "setShowUserAvatarUpdateDialog",
    setShowUpdateInfosForm: "setShowUpdateInfosForm",
    setShowDeleteDialog: "setShowDeleteDialog",
    setErrorMessage: "setErrorMessage",
};

const Profile = () => {
    const dispatch = useDispatch();

    const avatarUrl = useSelector(selectUserAvatarUrl);
    const userId = useSelector(selectUserId);

    const prevUsername = useSelector(selectUserUsername);
    const prevEmail = useSelector(selectUserEmail);
    const prevFirstName = useSelector(selectUserFirstName);
    const prevLastName = useSelector(selectUserLastName);

    const reducer = (state, { type, payload }) => {
        switch (type) {
            case "setUsername":
                return { ...state, username: payload };
            case "setShowUsernameError":
                return { ...state, showUsernameError: payload };
            case "setEmail":
                return { ...state, email: payload };
            case "setShowEmailError":
                return { ...state, showEmailError: payload };
            case "setFirstName":
                return { ...state, firstName: payload };
            case "setShowFirstNameError":
                return { ...state, showFirstNameError: payload };
            case "setLastName":
                return { ...state, lastName: payload };
            case "setShowLastNameError":
                return { ...state, showLastNameError: payload };
            case "setShowUpdateValidation":
                return { ...state, showUpdateValidation: payload };
            case "setShowUserAvatarUpdateDialog":
                return { ...state, showUserAvatarUpdateDialog: payload };
            case "setShowUpdateInfosForm":
                return { ...state, showUpdateInfosForm: payload };
            case "setShowDeleteDialog":
                return { ...state, showDeleteDialog: payload };
            case "setErrorMessage":
                return { ...state, errorMessage: payload };
            default:
                throw new Error("Reducer: unknown action");
        }
    };

    const [state, localDispatch] = useReducer(reducer, {
        username: "",
        showUsernameError: false,
        email: "",
        showEmailError: false,
        firstName: "",
        showFirstNameError: false,
        lastName: "",
        showLastNameError: false,
        showUpdateValidation: false,
        showUserAvatarUpdateDialog: false,
        showUpdateInfosForm: false,
        showDeleteDialog: false,
        errorMessage: "",
    });

    useEffect(() => {
        localDispatch({ type: ACTIONS.setUsername, payload: prevUsername });
        localDispatch({ type: ACTIONS.setEmail, payload: prevEmail });
        localDispatch({
            type: ACTIONS.setFirstName,
            payload: prevFirstName,
        });
        localDispatch({ type: ACTIONS.setLastName, payload: prevLastName });
    }, [prevUsername, prevEmail, prevFirstName, prevLastName]);

    const handleUpdateInfos = () => {
        localDispatch({
            type: ACTIONS.setShowUpdateValidation,
            payload: false,
        });
        localDispatch({ type: ACTIONS.setErrorMessage, payload: "" });
        localDispatch({
            type: ACTIONS.setShowUpdateInfosForm,
            payload: !state.showUpdateInfosForm,
        });
    };

    const handleDeleteClick = () => {
        localDispatch({
            type: ACTIONS.setShowDeleteDialog,
            payload: !state.showDeleteDialog,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            prevUsername === state.username &&
            prevEmail === state.email &&
            prevFirstName === state.firstName &&
            prevLastName === state.lastName
        ) {
            localDispatch({
                type: ACTIONS.setShowUpdateInfosForm,
                payload: false,
            });
            return;
        }

        const response = await fetch(`${API_BASE_URI}/API/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: state.username,
                email: state.email,
                firstName: state.firstName,
                lastName: state.lastName,
            }),
            credentials: "include",
        });
        const data = await response.json();
        if (data.statusCode >= 400) {
            localDispatch({
                type: ACTIONS.setErrorMessage,
                payload: data.message,
            });
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
        localDispatch({ type: ACTIONS.setShowUpdateValidation, payload: true });
        localDispatch({ type: ACTIONS.setShowUpdateInfosForm, payload: false });
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
                            onClick={() =>
                                localDispatch({
                                    type: ACTIONS.setShowUserAvatarUpdateDialog,
                                    payload: true,
                                })
                            }>
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
                reducer={{ ACTIONS, state, localDispatch }}
            />
            <Box>
                <Box
                    sx={{
                        maxWidth: theme.maxWidth.userForm,
                        margin: "0 auto 3rem",
                    }}>
                    {state.showUpdateValidation && (
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
                                state.showUpdateInfosForm
                                    ? "outlined"
                                    : "contained"
                            }
                            size="small"
                            sx={{
                                mt: theme.margin.buttonTop.notSpaced,
                                color: state.showUpdateInfosForm
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
                            reducer={{ ACTIONS, state, localDispatch }}
                        />
                    </Box>
                </Box>

                <Collapse in={state.showUpdateInfosForm}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            maxWidth: theme.maxWidth.userForm,
                            margin: "0 auto 3rem",
                        }}>
                        <ErrorMessage errorMessage={state.errorMessage} />
                        <UsernameInput
                            reducer={{ ACTIONS, state, localDispatch }}
                        />
                        <EmailInput
                            reducer={{ ACTIONS, state, localDispatch }}
                        />
                        <FirstNameInput
                            reducer={{ ACTIONS, state, localDispatch }}
                        />
                        <LastNameInput
                            reducer={{ ACTIONS, state, localDispatch }}
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
