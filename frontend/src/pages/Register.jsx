import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import UsernameInput from "../components/forms/UsernameInput";
import PasswordInput from "../components/forms/PasswordInput";
import PasswordConfirmInput from "../components/forms/PasswordConfirmInput";
import EmailInput from "../components/forms/EmailInput";
import FirstNameInput from "../components/forms/FirstNameInput";
import LastNameInput from "../components/forms/LastNameInput";
import SubmitButton from "../components/forms/SubmitButton";

import StyledForm from "../styles/StyledForm";
import fetchData from "../utils/fetchData";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await fetchData(
            `${process.env.REACT_APP_API_URI}users/`,
            "POST",
            { "Content-type": "application/json" },
            JSON.stringify({ username, password, email, firstName, lastName })
        );
        if (data.statusCode >= 400) {
            setErrorMessage(data.message);
        } else {
            navigate("/");
            console.log(data.message);
        }
    };

    return (
        <main>
            <h1>Register</h1>
            <StyledForm>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <p>{errorMessage}</p>}
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
                    <SubmitButton text="Register" />
                    <p>
                        Already a member ?&nbsp;<Link to="/login">Sign in</Link>
                    </p>
                </form>
            </StyledForm>
        </main>
    );
};

export default Register;
