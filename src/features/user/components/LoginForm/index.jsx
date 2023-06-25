import { useReducer } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    setToken,
    setUserInfo,
    selectUserLanguage,
    setShowLoginDialog,
    setShowRegisterDialog,
} from "../../userSlice";
import {
    setDestination,
    selectDestination,
    selectPageLocation,
} from "../../../navigation/navigationSlice";

import InputUsername from "../InputUsername";
import InputPassword from "../InputPassword";
import ErrorMessage from "../../../../components/ErrorMessage";
import Loader from "../../../../components/Loader";

import { API_BASE_URI } from "../../../../config/APIs";
import { formHasErrors, showFormErrors } from "../../userFormValidation";

import theme from "../../../../theme/theme";
import { Box, Link, Button, Typography } from "@mui/material";

import PropTypes from "prop-types";

const ACTIONS = {
    setUsername: "setUsername",
    setShowUsernameError: "setShowUsernameError",
    setPassword: "setPassword",
    setShowPasswordError: "setShowPasswordError",
    setErrorMessage: "setErrorMessage",
    setIsLoading: "setIsLoading",
};

const LoginForm = ({ isDialogForm }) => {
    LoginForm.propTypes = {
        isDialogForm: PropTypes.bool.isRequired,
    };

    const language = useSelector(selectUserLanguage);
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
            case "setErrorMessage":
                return { ...state, errorMessage: payload };
            case "setIsLoading":
                return { ...state, isLoading: payload };
            default:
                throw new Error("Reducer: unknown action.");
        }
    };

    const [state, localDispatch] = useReducer(reducer, {
        username: "",
        showUsernameError: false,
        password: "",
        showPasswordError: false,
        errorMessage: "",
        isLoading: false,
    });

    const handleRegister = (e) => {
        if (isDialogForm) {
            e.preventDefault();
            dispatch(setShowLoginDialog(false));
            dispatch(setShowRegisterDialog(true));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        localDispatch({ type: ACTIONS.setErrorMessage, payload: "" });

        const isDemoSubmit = e.target.classList.contains("demo");

        if (isDemoSubmit) {
            localDispatch({
                type: ACTIONS.setUsername,
                payload: "DemoUser",
            });
            localDispatch({
                type: ACTIONS.setPassword,
                payload: "password",
            });
        }

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
        ];

        if (!isDemoSubmit && formHasErrors(inputs)) {
            showFormErrors(inputs, localDispatch);
            return;
        }

        // submit

        localDispatch({ type: ACTIONS.setIsLoading, payload: true });
        page === "login" && dispatch(setDestination("/"));

        let loginData = {
            username: state.username,
            password: state.password,
        };

        if (isDemoSubmit) {
            loginData = {
                username: "DemoUser",
                password: "password",
            };
        }

        try {
            const response = await fetch(`${API_BASE_URI}/API/users/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(loginData),
                credentials: "include",
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            dispatch(setToken(data.user.token));
            dispatch(setUserInfo(data.user));
            navigate(destination);
            dispatch(setShowLoginDialog(false));
            dispatch(setDestination(""));
            localDispatch({
                type: ACTIONS.setIsLoading,
                payload: false,
            });
        } catch (error) {
            console.error(error);
            localDispatch({
                type: ACTIONS.setErrorMessage,
                payload: error.message,
            });
            localDispatch({
                type: ACTIONS.setIsLoading,
                payload: false,
            });
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: theme.maxWidth.userForm,
                margin: "0 auto 3rem",
            }}>
            <Box
                mb="4rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="1rem">
                <Typography component="span" fontWeight="700">
                    {
                        theme.languages[language].components.loginForm.demo
                            .description
                    }{" "}
                </Typography>
                <Button
                    className="demo"
                    onClick={handleSubmit}
                    variant="contained"
                    color="success"
                    title="Un utilisateur déjà enregistré pour tester l'application">
                    {theme.languages[language].components.loginForm.demo.label}
                </Button>
            </Box>
            <ErrorMessage errorMessage={state.errorMessage} />
            <Box>
                <InputUsername reducer={{ ACTIONS, state, localDispatch }} />
                <InputPassword reducer={{ ACTIONS, state, localDispatch }} />
            </Box>
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
                    {theme.languages[language].components.loginForm.submit}
                </Button>
                <Typography paragraph>
                    <Typography component="span">
                        {
                            theme.languages[language].components.loginForm
                                .redirect.question
                        }
                        &nbsp;
                        <Link
                            component={RouterLink}
                            to={!isDialogForm && "/register"}
                            onClick={handleRegister}
                            sx={{ color: theme.palette.primary.main }}>
                            {
                                theme.languages[language].components.loginForm
                                    .redirect.link
                            }
                        </Link>
                    </Typography>
                </Typography>
            </Box>
            {state.isLoading && <Loader modal hasMessage />}
        </Box>
    );
};

export default LoginForm;
