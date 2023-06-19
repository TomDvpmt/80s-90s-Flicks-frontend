import { useState, useEffect } from "react";
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

import { BASE_API_URI } from "../../utils/config";

import { Box, Link, Button, Typography } from "@mui/material";

import theme from "../../styles/theme";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSignedIn = useSelector(selectUserIsSignedIn);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        isSignedIn && navigate("/");
    }, [isSignedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault(e);
        setErrorMessage("");
        setIsLoading(true);

        if (password !== passwordConfirm) {
            setIsLoading(false);
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch(`${BASE_API_URI}/API/users/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    firstName,
                    lastName,
                }),
                credentials: "include",
            });
            if (response.status === 404) {
                throw new Error(
                    "Connexion impossible. Veuillez réessayer ultérieurement."
                );
            }
            const data = await response.json();
            dispatch(auth(data.token));
            navigate("/");
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }

        setIsLoading(false);
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
            <PasswordConfirmInput
                passwordConfirm={passwordConfirm}
                setPasswordConfirm={setPasswordConfirm}
                setErrorMessage={setErrorMessage}
            />
            <EmailInput
                email={email}
                setEmail={setEmail}
                setErrorMessage={setErrorMessage}
            />
            <FirstNameInput
                firstName={firstName}
                setFirstName={setFirstName}
                setErrorMessage={setErrorMessage}
            />
            <LastNameInput
                lastName={lastName}
                setLastName={setLastName}
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
