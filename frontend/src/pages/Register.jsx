import { useState } from "react";

import { Link } from "react-router-dom";

import UsernameInput from "../components/forms/UsernameInput";
import PasswordInput from "../components/forms/PasswordInput";
import PasswordConfirmInput from "../components/forms/PasswordConfirmInput";
import EmailInput from "../components/forms/EmailInput";
import FirstNameInput from "../components/forms/FirstNameInput";
import LastNameInput from "../components/forms/LastNameInput";
import SubmitButton from "../components/forms/SubmitButton";

import StyledForm from "../styles/StyledForm";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <main>
            <h1>Register</h1>
            <StyledForm>
                <form onSubmit={handleSubmit}>
                    <UsernameInput
                        username={username}
                        setUsername={setUsername}
                    />
                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                    />
                    <PasswordConfirmInput
                        passwordConfirm={passwordConfirm}
                        setPasswordConfirm={setPasswordConfirm}
                    />
                    <EmailInput email={email} setEmail={setEmail} />
                    <FirstNameInput
                        firstName={firstName}
                        setFirstName={setFirstName}
                    />
                    <LastNameInput
                        lastName={lastName}
                        setLastName={setLastName}
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
