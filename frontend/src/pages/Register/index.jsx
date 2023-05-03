// import UserForm from "../../components/UserForm";

import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userAuth } from "../../features/user";

import UsernameInput from "../../components/form-fields/UsernameInput";
import PasswordInput from "../../components/form-fields/PasswordInput";
import PasswordConfirmInput from "../../components/form-fields/PasswordConfirmInput";
import EmailInput from "../../components/form-fields/EmailInput";
import FirstNameInput from "../../components/form-fields/FirstNameInput";
import LastNameInput from "../../components/form-fields/LastNameInput";
import ErrorMessage from "../../components/ErrorMessage";

import { Box, Link, Button, Typography } from "@mui/material";

import theme from "../../assets/styles/theme";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(e);

        const response = await fetch(`/API/users/`, {
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
        });
        const data = await response.json();
        if (data.statusCode >= 400) {
            setErrorMessage(data.message);
            return;
        }

        dispatch(userAuth());
        sessionStorage.setItem("token", data.token);
        navigate("/");
    };

    return (
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
                    sx={{ margin: `${theme.margin.buttonTop.spaced} 0` }}>
                    Enregistrer
                </Button>
                <Typography paragraph>
                    <Typography component="span">
                        Déjà inscrit ?&nbsp;
                        <Link component={RouterLink} to="/login">
                            Se connecter
                        </Link>
                    </Typography>
                </Typography>
            </Box>
        </Box>
        // <>
        //     <UserForm />
        // </>
    );
};

export default Register;
