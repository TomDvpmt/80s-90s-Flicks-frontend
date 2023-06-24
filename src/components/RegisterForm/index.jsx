import { useEffect, useReducer } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    selectUserToken,
    selectUserLanguage,
    selectUserId,
    setUserInfo,
} from "../../features/userSlice";
import {
    setShowLoginDialog,
    setShowRegisterDialog,
} from "../../features/dialogsSlice";
import {
    setDestination,
    selectDestination,
    selectPageLocation,
} from "../../features/pageSlice";

import InputUsername from "../InputUsername";
import InputPassword from "../InputPassword";
import InputPasswordConfirm from "../InputPasswordConfirm";
import InputEmail from "../InputEmail";
import InputFirstName from "../InputFirstName";
import InputLastName from "../InputLastName";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";

import { API_BASE_URI } from "../../config/APIs";
import { formHasErrors, showFormErrors } from "../../utils/formValidation";

import { Box, Link, Button, Typography } from "@mui/material";

import theme from "../../styles/theme";

import PropTypes from "prop-types";

const ACTIONS = {
    setUsername: "setUsername",
    setShowUsernameError: "setShowUsernameError",
    setPassword: "setPassword",
    setShowPasswordError: "setShowPasswordError",
    setPasswordConfirm: "setPasswordConfirm",
    setShowPasswordConfirmError: "setShowPasswordConfirmError",
    setEmail: "setEmail",
    setShowEmailError: "setShowEmailError",
    setFirstName: "setFirstName",
    setShowFirstNameError: "setShowFirstNameError",
    setLastName: "setLastName",
    setShowLastNameError: "setShowLastNameError",
    setErrorMessage: "setErrorMessage",
    setIsLoading: "setIsLoading",
};

const RegisterForm = ({ isDialogForm }) => {
    RegisterForm.propTypes = {
        isDialogForm: PropTypes.bool.isRequired,
    };
    const language = useSelector(selectUserLanguage);
    const token = useSelector(selectUserToken);
    const userId = useSelector(selectUserId);
    const page = useSelector(selectPageLocation);
    const destination = useSelector(selectDestination);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const reducer = (state, { type, payload }) => {
        switch (type) {
            case "setUsername":
                return { ...state, username: payload };
            case "setShowUsernameError":
                return { ...state, showUsernameError: payload };
            case "setPassword":
                return { ...state, password: payload };
            case "setShowPasswordError":
                return { ...state, showPasswordError: payload };
            case "setPasswordConfirm":
                return { ...state, passwordConfirm: payload };
            case "setShowPasswordConfirmError":
                return { ...state, showPasswordConfirmError: payload };
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
            case "setErrorMessage":
                return { ...state, errorMessage: payload };
            case "setIsLoading":
                return { ...state, isLoading: payload };
            default:
                throw new Error("Reducer: unknown action");
        }
    };

    const [state, localDispatch] = useReducer(reducer, {
        username: "",
        showUsernameError: false,
        password: "",
        showPasswordError: false,
        passwordConfirm: "",
        showPasswordConfirmError: false,
        email: "",
        showEmailError: false,
        firstName: "",
        showFirstNameError: false,
        lastName: "",
        showLastNameError: false,
        errorMessage: "",
        isLoading: false,
    });

    const handleLogin = (e) => {
        if (isDialogForm) {
            e.preventDefault();
            dispatch(setShowRegisterDialog(false));
            dispatch(setShowLoginDialog(true));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        localDispatch({ type: ACTIONS.setErrorMessage, payload: "" });

        // form validation
        let inputs = [
            {
                type: "username",
                state: state.username,
                showErrorsActionType: ACTIONS.setShowUsernameError,
            },
            {
                type: "password",
                state: state.password,
                showErrorsActionType: ACTIONS.setShowPasswordError,
            },
            {
                type: "passwordConfirm",
                state: state.passwordConfirm,
                showErrorsActionType: ACTIONS.setShowPasswordConfirmError,
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

        if (state.password !== state.passwordConfirm) {
            localDispatch({ type: ACTIONS.setIsLoading, payload: false });
            localDispatch({
                type: ACTIONS.setShowPasswordConfirmError,
                payload: true,
            });
        }

        if (formHasErrors(inputs)) {
            showFormErrors(inputs, localDispatch);
            return;
        }

        if (state.password !== state.passwordConfirm) return;

        // submit

        localDispatch({ type: ACTIONS.setIsLoading, payload: true });
        page === "register" && dispatch(setDestination("/"));

        try {
            const response = await fetch(`${API_BASE_URI}/API/users/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    username: state.username,
                    password: state.password,
                    email: state.email,
                    firstName: state.firstName,
                    lastName: state.lastName,
                }),
                credentials: "include",
            });
            const data = await response.json();
            if (!response.ok) {
                localDispatch({
                    type: ACTIONS.setErrorMessage,
                    payload: data.message,
                });
                throw new Error(data.message);
            }
            dispatch(setUserInfo(data.user));
            dispatch(setShowRegisterDialog(false));
            localDispatch({ type: ACTIONS.setIsLoading, payload: false });
        } catch (error) {
            localDispatch({ type: ACTIONS.setIsLoading, payload: false });
            console.error(error);
        }
    };

    useEffect(() => {
        if (token) {
            navigate(destination);
            dispatch(setDestination(""));
        }
    }, [userId, token, destination, navigate, dispatch]);

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: theme.maxWidth.userForm,
                    margin: "0 auto 3rem",
                }}>
                <ErrorMessage errorMessage={state.errorMessage} />
                {state.isLoading ? (
                    <Loader hasMessage />
                ) : (
                    <Box>
                        <InputUsername
                            reducer={{ ACTIONS, state, localDispatch }}
                        />
                        <InputPassword
                            reducer={{ ACTIONS, state, localDispatch }}
                        />
                        <InputPasswordConfirm
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
                    </Box>
                )}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                    }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            margin: `${theme.margin.buttonTop.spaced} 0`,
                            color: "white",
                        }}>
                        {
                            theme.languages[language].components.registerForm
                                .submit
                        }
                    </Button>
                    <Typography paragraph>
                        <Typography component="span">
                            {
                                theme.languages[language].components
                                    .registerForm.redirect.question
                            }
                            &nbsp;
                            <Link
                                component={RouterLink}
                                to={!isDialogForm && "/login"}
                                onClick={handleLogin}
                                sx={{ color: theme.palette.primary.main }}>
                                {
                                    theme.languages[language].components
                                        .registerForm.redirect.link
                                }
                            </Link>
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default RegisterForm;
