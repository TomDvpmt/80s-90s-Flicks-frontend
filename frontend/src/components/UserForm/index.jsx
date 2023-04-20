import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import UsernameInput from "../form-fields/UsernameInput";
import PasswordInput from "../form-fields/PasswordInput";
import PasswordConfirmInput from "../form-fields/PasswordConfirmInput";
import EmailInput from "../form-fields/EmailInput";
import FirstNameInput from "../form-fields/FirstNameInput";
import LastNameInput from "../form-fields/LastNameInput";
import ErrorMessage from "../ErrorMessage";

import { userAuth, userSetInfo } from "../../services/features/user";

import { Box, Button, Typography } from "@mui/material";
import theme from "../../assets/styles/theme";

import PropTypes from "prop-types";

const UserForm = ({
    page,
    userId,
    defaultFormValues,
    setShowUpdateForm,
    setShowUpdateValidation,
    setUserData,
}) => {
    UserForm.propTypes = {
        userId: PropTypes.string,
        defaultFormValues: PropTypes.object,
        setShowUpdateForm: PropTypes.func,
        setShowUpdateValidation: PropTypes.func,
        setUserData: PropTypes.func,
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState(
        page === "profile" ? defaultFormValues.username : ""
    );
    const [email, setEmail] = useState(
        page === "profile" ? defaultFormValues.email : ""
    );
    const [firstName, setFirstName] = useState(
        page === "profile" ? defaultFormValues.firstName : ""
    );
    const [lastName, setLastName] = useState(
        page === "profile" ? defaultFormValues.lastName : ""
    );
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [pageData, setPageData] = useState({});

    useEffect(() => {
        switch (page) {
            case "login":
                setPageData({
                    endPoint: "users/login",
                    method: "POST",
                    submitButtonText: "Log in",
                    redirectLine: (
                        <span>
                            Pas encore inscrit ?&nbsp;
                            <Link to="/register">Créer un compte</Link>
                        </span>
                    ),
                    dataToSubmit: {
                        username,
                        password,
                    },
                    handleResponse: (data) => {
                        sessionStorage.setItem("token", data.token);
                        dispatch(userAuth());
                        navigate("/");
                    },
                });
                break;

            case "register":
                setPageData({
                    endPoint: "users/",
                    method: "POST",
                    submitButtonText: "Register",
                    redirectLine: (
                        <span>
                            Déjà inscrit ?&nbsp;
                            <Link to="/login">Se connecter</Link>
                        </span>
                    ),
                    dataToSubmit: {
                        username,
                        password,
                        email,
                        firstName,
                        lastName,
                    },
                    handleResponse: (data) => {
                        console.log(data.message);
                        sessionStorage.setItem("token", data.token);
                        navigate("/");
                    },
                });
                break;

            case "profile":
                setPageData({
                    endPoint: `users/${userId}`,
                    method: "PUT",
                    submitButtonText: "Enregistrer",
                    dataToSubmit: {
                        username,
                        email,
                        firstName,
                        lastName,
                    },
                    handleResponse: (data) => {
                        dispatch(
                            userSetInfo({
                                id: userId,
                                username: data.username,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                email: data.email,
                            })
                        );
                        setShowUpdateValidation(true);
                        setShowUpdateForm(false);
                    },
                });
                break;
            default:
                setPageData({});
        }
    }, [
        username,
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        page,
        userId,
        setShowUpdateForm,
        setShowUpdateValidation,
        setUserData,
        navigate,
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");

        if (
            page === "profile" &&
            Object.keys(defaultFormValues).reduce(
                (acc, key) =>
                    acc &&
                    pageData.dataToSubmit[key] === defaultFormValues[key],
                true
            )
        ) {
            setShowUpdateForm(false);
            return;
        }

        const response = await fetch(`/API/${pageData.endPoint}`, {
            method: pageData.method,
            headers: {
                "Content-type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify(pageData.dataToSubmit),
        });
        const data = await response.json();
        if (data.statusCode >= 400) {
            setErrorMessage(data.message);
        } else {
            pageData.handleResponse(data);
        }
    };

    return (
        <Box component="section">
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
                {page !== "profile" && (
                    <>
                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
                            setErrorMessage={setErrorMessage}
                        />
                        {page !== "login" && (
                            <PasswordConfirmInput
                                passwordConfirm={passwordConfirm}
                                setPasswordConfirm={setPasswordConfirm}
                                setErrorMessage={setErrorMessage}
                            />
                        )}
                    </>
                )}
                {page !== "login" && (
                    <>
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
                    </>
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
                        sx={{ margin: `${theme.margin.buttonTop.spaced} 0` }}>
                        {pageData.submitButtonText}
                    </Button>
                    <Typography paragraph>
                        {page !== "profile" && pageData.redirectLine}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default UserForm;
