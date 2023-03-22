import { useState } from "react";

import { Link } from "react-router-dom";

import UsernameInput from "../components/forms/UsernameInput";
import PasswordInput from "../components/forms/PasswordInput";
import SubmitButton from "../components/forms/SubmitButton";

import StyledForm from "../styles/StyledForm";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <main>
            <h1>Sign In</h1>
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
                    <SubmitButton text="Sign in" />
                    <p>
                        Not a member yet ?&nbsp;
                        <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </StyledForm>
        </main>
    );
};

export default Login;
