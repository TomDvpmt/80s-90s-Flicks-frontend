import { useEffect } from "react";
import { setUserInfo } from "../utils/requests";

import UserForm from "../components/forms/UserForm";

const Login = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);
    return (
        <main>
            <h1>Connexion</h1>
            <UserForm page="login" />
        </main>
    );
};

export default Login;
