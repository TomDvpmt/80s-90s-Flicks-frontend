import { useState, useEffect } from "react";
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

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSignedIn = useSelector(selectUserIsSignedIn);

    const [username, setUsername] = useState("");
    const [showUsernameError, setShowUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [showPasswordError, setShowPasswordError] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        isSignedIn && navigate("/");
    }, [isSignedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault(e);
        setErrorMessage("");

        let inputs = [
            {
                type: "username",
                state: username,
                showErrors: setShowUsernameError,
            },
            {
                type: "password",
                state: password,
                showErrors: setShowPasswordError,
            },
        ];

        if (formHasErrors(inputs)) {
            showFormErrors(inputs);
            return;
        }

        setIsLoading(true);

        let loginData = {
            username,
            password,
        };

        if (e.target.id === "demo") {
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
                setIsLoading(false);
                setErrorMessage(data.message);
                throw new Error(data.message);
            }
            dispatch(auth(data.token));
            navigate("/");
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return isLoading ? (
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
            <ErrorMessage errorMessage={errorMessage} />
            <UsernameInput
                username={username}
                setUsername={setUsername}
                setErrorMessage={setErrorMessage}
                showUsernameError={showUsernameError}
                setShowUsernameError={setShowUsernameError}
            />
            <PasswordInput
                password={password}
                setPassword={setPassword}
                setErrorMessage={setErrorMessage}
                showPasswordError={showPasswordError}
                setShowPasswordError={setShowPasswordError}
            />
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
