import { useEffect } from "react";

import UserForm from "../components/forms/UserForm";

import store from "../utils/store";
import { pageSetType } from "../features/page";

const Register = () => {
    useEffect(() => {
        store.dispatch(pageSetType("register"));
    }, []);
    return (
        <main>
            <h1>Créer un compte</h1>
            <UserForm />
        </main>
    );
};

export default Register;
