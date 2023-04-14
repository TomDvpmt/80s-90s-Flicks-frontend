import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import PasswordConfirmInput from "./PasswordConfirmInput";
import EmailInput from "./EmailInput";
import FirstNameInput from "./FirstNameInput";
import LastNameInput from "./LastNameInput";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "../ErrorMessage";

import store from "../../utils/store";
import { userAuth, userSetToken, userSetInfo } from "../../features/user";

import { fetchData } from "../../utils/requests";

import StyledForm from "../../styles/StyledForm";

import PropTypes from "prop-types";

const UserForm = ({
    page,
    userId,
    defaultFormValues,
    setShowUpdateForm,
    setUserData,
}) => {
    UserForm.propTypes = {
        userId: PropTypes.string,
        defaultFormValues: PropTypes.object,
        setShowUpdateForm: PropTypes.func,
        setUserData: PropTypes.func,
    };

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

    const navigate = useNavigate();

    useEffect(() => {
        switch (page) {
            case "login":
                setPageData({
                    endPoint: "users/login",
                    method: "POST",
                    submitButtonText: "Se connecter",
                    redirectLine: (
                        <p>
                            Pas encore incrit ?&nbsp;
                            <Link to="/register">Créer un compte</Link>
                        </p>
                    ),
                    dataToSubmit: {
                        username,
                        password,
                    },
                    handleResponse: (data) => {
                        sessionStorage.setItem("userId", data._id);
                        sessionStorage.setItem("token", data.token);
                        store.dispatch(userAuth());
                        store.dispatch(userSetToken(data.token));
                        navigate("/");
                    },
                });
                break;

            case "register":
                setPageData({
                    endPoint: "users/",
                    method: "POST",
                    submitButtonText: "S'enregistrer",
                    redirectLine: (
                        <p>
                            Déjà inscrit ?&nbsp;
                            <Link to="/login">Se connecter</Link>
                        </p>
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
                        sessionStorage.setItem("userId", data._id);
                        sessionStorage.setItem("token", data.token);
                        navigate("/");
                    },
                });
                break;

            case "profile":
                setPageData({
                    endPoint: `users/${userId}`,
                    method: "PUT",
                    submitButtonText: "Enregistrer les modifications",
                    dataToSubmit: {
                        username,
                        email,
                        firstName,
                        lastName,
                    },
                    handleResponse: (data) => {
                        store.dispatch(
                            userSetInfo({
                                id: userId,
                                username: data.username,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                email: data.email,
                            })
                        );
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
        setUserData,
        navigate,
        // setToken,
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

        const data = await fetchData(
            `${process.env.REACT_APP_API_URI}${pageData.endPoint}`,
            {
                method: pageData.method,
                headers: {
                    "Content-type": "application/json",
                    Authorization: `BEARER ${token}`,
                },
                body: JSON.stringify(pageData.dataToSubmit),
            }
        );
        if (data.statusCode >= 400) {
            setErrorMessage(data.message);
        } else {
            pageData.handleResponse(data);
        }
    };

    return (
        <StyledForm>
            <form onSubmit={handleSubmit}>
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
                <SubmitButton text={pageData.submitButtonText} />
                {page !== "profile" && pageData.redirectLine}
            </form>
        </StyledForm>
    );
};

export default UserForm;
