import UserForm from "../components/forms/UserForm";
import PropTypes from "prop-types";

import store from "../utils/store";
import { pageSetType } from "../features/page";

const Login = () => {
    Login.propTypes = {
        setToken: PropTypes.func,
    };

    store.dispatch(pageSetType("login"));

    return (
        <main>
            <h1>Connexion</h1>
            <UserForm />
        </main>
    );
};

export default Login;
