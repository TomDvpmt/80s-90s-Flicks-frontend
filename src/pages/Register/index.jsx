import { useEffect, useReducer } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth, selectUserIsSignedIn } from "../../features/userSlice";

import UsernameInput from "../../components/form-fields/UsernameInput";
import PasswordInput from "../../components/form-fields/PasswordInput";
import PasswordConfirmInput from "../../components/form-fields/PasswordConfirmInput";
import EmailInput from "../../components/form-fields/EmailInput";
import FirstNameInput from "../../components/form-fields/FirstNameInput";
import LastNameInput from "../../components/form-fields/LastNameInput";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";

import { API_BASE_URI } from "../../utils/config";
import { formHasErrors, showFormErrors } from "../../utils/formValidation";

import { Box, Link, Button, Typography } from "@mui/material";

import theme from "../../styles/theme";

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

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSignedIn = useSelector(selectUserIsSignedIn);

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

    useEffect(() => {
        isSignedIn && navigate("/");
    }, [isSignedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault(e);
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
                localDispatch({ type: ACTIONS.setIsLoading, payload: false });
                localDispatch({
                    type: ACTIONS.setErrorMessage,
                    payload: data.message,
                });
                throw new Error(data.message);
            }
            dispatch(auth(data.token));
            navigate("/");
        } catch (error) {
            localDispatch({ type: ACTIONS.setIsLoading, payload: false });
            console.error(error);
        }
    };

    return state.isLoading ? (
        <Loader />
    ) : (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: theme.maxWidth.userForm,
                margin: "0 auto 3rem",
            }}>
            <ErrorMessage errorMessage={state.errorMessage} />
            <UsernameInput reducer={{ ACTIONS, state, localDispatch }} />
            <PasswordInput reducer={{ ACTIONS, state, localDispatch }} />
            <PasswordConfirmInput reducer={{ ACTIONS, state, localDispatch }} />
            <EmailInput reducer={{ ACTIONS, state, localDispatch }} />
            <FirstNameInput reducer={{ ACTIONS, state, localDispatch }} />
            <LastNameInput reducer={{ ACTIONS, state, localDispatch }} />
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
                    Créer le compte
                </Button>
                <Typography paragraph>
                    <Typography component="span">
                        Déjà inscrit ?&nbsp;
                        <Link
                            component={RouterLink}
                            to="/login"
                            sx={{ color: theme.palette.primary.main }}>
                            Se connecter
                        </Link>
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;
