import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import UsernameInput from "../components/forms/UsernameInput";
import PasswordInput from "../components/forms/PasswordInput";
import SubmitButton from "../components/forms/SubmitButton";
import ErrorMessage from "../components/ErrorMessage";

import fetchData from "../utils/fetchData";

import StyledForm from "../styles/StyledForm";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token && token !== "null") {
            navigate("/");
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await fetchData(
            `${process.env.REACT_APP_API_URI}users/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        );
        if (data.statusCode >= 400) {
            setErrorMessage(data.message);
        } else {
            localStorage.setItem("userId", data._id);
            localStorage.setItem("token", data.token);
            navigate("/");
        }
    };

    return (
        <main>
            <h1>Connexion</h1>
            <StyledForm>
                <form onSubmit={handleSubmit}>
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
                    <SubmitButton text="Se connecter" />
                    <p>
                        Pas encore incrit ?&nbsp;
                        <Link to="/register">Créer un compte</Link>
                    </p>
                </form>
            </StyledForm>
        </main>
    );
};

export default Login;
