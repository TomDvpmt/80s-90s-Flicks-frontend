import { useState, useEffect, useReducer } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    selectUserId,
    selectUserToken,
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

import UsernameInput from "../form-fields/UsernameInput";
import PasswordInput from "../form-fields/PasswordInput";
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
    setErrorMessage: "setErrorMessage",
    setIsLoading: "setIsLoading",
};

const LoginForm = ({ isDialogForm }) => {
    LoginForm.propTypes = {
        isDialogForm: PropTypes.bool.isRequired,
    };

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

    // useEffect(() => {
    //     token && navigate("/");
    // }, [token, navigate]);

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

            dispatch(setUserInfo(data.user));
            dispatch(setShowLoginDialog(false));
            localDispatch({ type: ACTIONS.setIsLoading, payload: false });
        } catch (error) {
            console.error(error);
            localDispatch({
                type: ACTIONS.setErrorMessage,
                payload: error.message,
            });
        }

        localDispatch({
            type: ACTIONS.setIsLoading,
            payload: false,
        });
    };

    useEffect(() => {
        if (token) {
            navigate(destination);
            dispatch(setDestination(""));
        }
    }, [userId]);

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
                    Pour tester l'application sans s'inscrire :{" "}
                </Typography>
                <Button
                    className="demo"
                    onClick={handleSubmit}
                    variant="contained"
                    color="success"
                    title="Un utilisateur déjà enregistré pour tester l'application">
                    Utilisateur démo
                </Button>
            </Box>
            <ErrorMessage errorMessage={state.errorMessage} />
            <Box>
                <UsernameInput reducer={{ ACTIONS, state, localDispatch }} />
                <PasswordInput reducer={{ ACTIONS, state, localDispatch }} />
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
                    Se connecter
                </Button>
                <Typography paragraph>
                    <Typography component="span">
                        Pas encore inscrit ?&nbsp;
                        <Link
                            component={RouterLink}
                            to={!isDialogForm && "/register"}
                            onClick={handleRegister}
                            sx={{ color: theme.palette.primary.main }}>
                            Créer un compte
                        </Link>
                    </Typography>
                </Typography>
            </Box>
            {state.isLoading && <Loader modal hasMessage />}
        </Box>
    );
};

export default LoginForm;
