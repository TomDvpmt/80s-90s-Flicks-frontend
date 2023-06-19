import { useEffect, useReducer } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth, selectUserIsSignedIn } from "../../features/userSlice";

import UsernameInput from "../../components/form-fields/UsernameInput";
import PasswordInput from "../../components/form-fields/PasswordInput";
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
    setErrorMessage: "setErrorMessage",
    setIsLoading: "setIsLoading",
};

const Login = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault(e);
        localDispatch({ type: ACTIONS.setErrorMessage, payload: "" });

        const isDemoSubmit = e.target.id === "demo";

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
            <Box mb="2rem" display="flex" justifyContent="center">
                <Button
                    id="demo"
                    onClick={handleSubmit}
                    variant="contained"
                    color="secondary">
                    Utilisateur démo
                </Button>
            </Box>
            <ErrorMessage errorMessage={state.errorMessage} />
            <UsernameInput reducer={{ ACTIONS, state, localDispatch }} />
            <PasswordInput reducer={{ ACTIONS, state, localDispatch }} />
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
                            to="/register"
                            sx={{ color: theme.palette.primary.main }}>
                            Créer un compte
                        </Link>
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
