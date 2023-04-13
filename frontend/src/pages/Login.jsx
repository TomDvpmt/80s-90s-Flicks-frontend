import UserForm from "../components/forms/UserForm";

import store from "../utils/store";
import { pageSetType } from "../features/page";

const Login = () => {
    store.dispatch(pageSetType("login"));

    return (
        <main>
            <h1>Connexion</h1>
            <UserForm />
        </main>
    );
};

export default Login;
