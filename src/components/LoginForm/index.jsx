import { useEffect, useReducer } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth, selectUserIsSignedIn } from "../../features/userSlice";
import {
    setShowLoginDialog,
    setShowRegisterDialog,
} from "../../features/dialogsSlice";
import { setDestination, selectDestination } from "../../features/pageSlice";

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

    const isSignedIn = useSelector(selectUserIsSignedIn);
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

    useEffect(() => {
        isSignedIn && navigate("/");
    }, [isSignedIn, navigate]);

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
            localDispatch({ type: ACTIONS.setUsername, payload: "DemoUser" });
            localDispatch({ type: ACTIONS.setPassword, payload: "password" });
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
                localDispatch({ type: ACTIONS.setIsLoading, payload: false });
                localDispatch({
                    type: ACTIONS.setErrorMessage,
                    payload: data.message,
                });
                throw new Error(data.message);
            }
            dispatch(auth(data.token));
            dispatch(setShowLoginDialog(false));
            navigate(destination);
            dispatch(setDestination(""));
        } catch (error) {
            localDispatch({ type: ACTIONS.setIsLoading, payload: false });
            console.error(error);
        }
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: theme.maxWidth.userForm,
                    margin: "0 auto 3rem",
                }}>
                <Box mb="2rem" display="flex" justifyContent="center">
                    <Button
                        className="demo"
                        onClick={handleSubmit}
                        variant="contained"
                        color="secondary">
                        Utilisateur démo
                    </Button>
                </Box>
                <ErrorMessage errorMessage={state.errorMessage} />
                {state.isLoading ? (
                    <Loader />
                ) : (
                    <Box>
                        <UsernameInput
                            reducer={{ ACTIONS, state, localDispatch }}
                        />
                        <PasswordInput
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
            </Box>
        </>
    );
};

export default LoginForm;
