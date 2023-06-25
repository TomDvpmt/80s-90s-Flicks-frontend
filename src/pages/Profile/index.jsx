import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectUserLanguage,
    setUserInfo,
    selectUserAvatarUrl,
    selectUserUsername,
    selectUserFirstName,
    selectUserLastName,
    selectUserEmail,
    selectUserId,
    setShowDeleteAccountDialog,
    selectShowDeleteAccountDialog,
    selectShowAvatarUpdateDialog,
    setShowAvatarUpdateDialog,
} from "../../features/user/userSlice";
import { setDemoUserId } from "../../config/configSlice";

import AvatarUpdateDialog from "../../features/user/components/AvatarUpdateDialog";
import InputUsername from "../../features/user/components/InputUsername";
import InputEmail from "../../features/user/components/InputEmail";
import InputFirstName from "../../features/user/components/InputFirstName";
import InputLastName from "../../features/user/components/InputLastName";
import DeleteAccountDialog from "../../features/user/components/DeleteAccountDialog";
import Language from "../../features/user/components/Language";
import ValidationMessage from "../../components/ValidationMessage";
import ErrorMessage from "../../components/ErrorMessage";

import { API_BASE_URI } from "../../config/APIs";
import {
    formHasErrors,
    showFormErrors,
} from "../../features/user/userFormValidation";

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

import theme from "../../theme/theme";

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
    setShowUpdateInfosForm: "setShowUpdateInfosForm",
    setErrorMessage: "setErrorMessage",
};

const Profile = () => {
    const language = useSelector(selectUserLanguage);
    const userId = useSelector(selectUserId);
    const avatarUrl = useSelector(selectUserAvatarUrl);

    const prevUsername = useSelector(selectUserUsername);
    const prevEmail = useSelector(selectUserEmail);
    const prevFirstName = useSelector(selectUserFirstName);
    const prevLastName = useSelector(selectUserLastName);

    const showDeleteAccountDialog = useSelector(selectShowDeleteAccountDialog);
    const showAvatarUpdateDialog = useSelector(selectShowAvatarUpdateDialog);

    const dispatch = useDispatch();

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
            case "setShowUpdateInfosForm":
                return { ...state, showUpdateInfosForm: payload };
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
        showUpdateInfosForm: false,
        errorMessage: "",
    });

    useEffect(() => {
        fetch(`${API_BASE_URI}/API/config/demo-user-id`, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => dispatch(setDemoUserId(data)))
            .catch((error) => console.error(error));
    }, [dispatch]);

    useEffect(() => {
        localDispatch({ type: ACTIONS.setUsername, payload: prevUsername });
        localDispatch({ type: ACTIONS.setEmail, payload: prevEmail });
        localDispatch({
            type: ACTIONS.setFirstName,
            payload: prevFirstName,
        });
        localDispatch({ type: ACTIONS.setLastName, payload: prevLastName });
    }, [prevUsername, prevEmail, prevFirstName, prevLastName]);

    const handleUpdateAvatar = () => {
        dispatch(setShowAvatarUpdateDialog(true));
        localDispatch({
            type: ACTIONS.setShowUpdateValidation,
            payload: false,
        });
    };

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
        dispatch(setShowDeleteAccountDialog(true));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // form validation
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

        let inputs = [
            {
                type: "username",
                state: state.username,
                showErrorsActionType: ACTIONS.setShowUsernameError,
            },
            {
                type: "email",
                state: state.email,
                showErrorsActionType: ACTIONS.setShowEmailError,
            },
            {
                type: "firstName",
                state: state.firstName,
                showErrorsActionType: ACTIONS.setShowFirstNameError,
            },
            {
                type: "lastName",
                state: state.lastName,
                showErrorsActionType: ACTIONS.setShowLastNameError,
            },
        ];

        if (formHasErrors(inputs)) {
            showFormErrors(inputs, localDispatch);
            return;
        }

        // submit

        const updateData = {
            username: state.username,
            email: state.email,
            firstName: state.firstName,
            lastName: state.lastName,
        };

        try {
            const response = await fetch(
                `${API_BASE_URI}/API/users/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(updateData),
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (!response.ok) {
                localDispatch({
                    type: ACTIONS.setErrorMessage,
                    payload: data.message,
                });
                throw new Error(data.message);
            }

            dispatch(
                setUserInfo({
                    id: userId,
                    username: data.username,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                })
            );
            localDispatch({
                type: ACTIONS.setShowUpdateValidation,
                payload: true,
            });
            localDispatch({
                type: ACTIONS.setShowUpdateInfosForm,
                payload: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const leftCellStyle = {
        textAlign: "right",
        fontWeight: "700",
    };

    const rightCellStyle = {
        overflowWrap: "break-word",
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
                        <IconButton onClick={handleUpdateAvatar}>
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

            {showAvatarUpdateDialog && (
                <AvatarUpdateDialog reducer={{ ACTIONS, localDispatch }} />
            )}
            <Box>
                <Box width="100%" maxWidth={theme.maxWidth.userForm} mb="2rem">
                    <Language />
                </Box>
                <Box>
                    <Box
                        sx={{
                            maxWidth: theme.maxWidth.userForm,
                            margin: "0 auto 3rem",
                        }}>
                        {state.showUpdateValidation && (
                            <ValidationMessage
                                text={
                                    theme.languages[language].pages.profile
                                        .update.validation
                                }
                            />
                        )}
                        <TableContainer component={Paper}>
                            <Table sx={{ tableLayout: "fixed" }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={leftCellStyle}>
                                            {
                                                theme.languages[language].pages
                                                    .profile.username
                                            }
                                            &nbsp;:
                                        </TableCell>
                                        <TableCell sx={rightCellStyle}>
                                            {prevUsername}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={leftCellStyle}>
                                            {
                                                theme.languages[language].pages
                                                    .profile.email
                                            }
                                            &nbsp;:
                                        </TableCell>
                                        <TableCell sx={rightCellStyle}>
                                            {prevEmail}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={leftCellStyle}>
                                            {
                                                theme.languages[language].pages
                                                    .profile.firstName
                                            }
                                            &nbsp;:
                                        </TableCell>
                                        <TableCell sx={rightCellStyle}>
                                            {prevFirstName}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={leftCellStyle}>
                                            {
                                                theme.languages[language].pages
                                                    .profile.lastName
                                            }
                                            &nbsp;:
                                        </TableCell>
                                        <TableCell sx={rightCellStyle}>
                                            {prevLastName}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box
                            sx={{
                                mt: {
                                    xs: "1rem",
                                    sm: theme.margin.buttonTop.notSpaced,
                                },
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "center",
                                alignItems: "center",
                                gap: ".5rem",
                                "& button": {
                                    maxWidth: "max-content",
                                },
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
                                    color: state.showUpdateInfosForm
                                        ? "inherit"
                                        : "white",
                                }}
                                onClick={handleUpdateInfos}>
                                {
                                    theme.languages[language].pages.profile
                                        .update.label
                                }
                            </Button>
                            <Button
                                type="button"
                                variant="text"
                                size="small"
                                onClick={handleDeleteClick}>
                                {
                                    theme.languages[language].pages.profile
                                        .delete.label
                                }
                            </Button>
                            {showDeleteAccountDialog && <DeleteAccountDialog />}
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
                            <InputUsername
                                reducer={{ ACTIONS, state, localDispatch }}
                            />
                            <InputEmail
                                reducer={{ ACTIONS, state, localDispatch }}
                            />
                            <InputFirstName
                                reducer={{ ACTIONS, state, localDispatch }}
                            />
                            <InputLastName
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
                                    {
                                        theme.languages[language].pages.profile
                                            .update.submit
                                    }
                                </Button>
                            </Box>
                        </Box>
                    </Collapse>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
