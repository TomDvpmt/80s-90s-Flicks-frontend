import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth, selectUserIsSignedIn } from "../../features/userSlice";

import UsernameInput from "../../components/form-fields/UsernameInput";
import PasswordInput from "../../components/form-fields/PasswordInput";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";

import { API_BASE_URI } from "../../utils/config";

import { Box, Link, Button, Typography } from "@mui/material";

import theme from "../../styles/theme";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSignedIn = useSelector(selectUserIsSignedIn);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        isSignedIn && navigate("/");
    }, [isSignedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault(e);
        setErrorMessage("");
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
            if (!response.ok) {
                throw new Error(
                    "Connexion impossible. Veuillez réessayer ultérieurement."
                );
            }
            const data = await response.json();
            setIsLoading(false);
            dispatch(auth(data.token));
            navigate("/");
        } catch (error) {
            setIsLoading(false);
            setErrorMessage(
                "Connexion impossible. Veuillez réessayer ultérieurement."
            );
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
            />
            <PasswordInput
                password={password}
                setPassword={setPassword}
                setErrorMessage={setErrorMessage}
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
