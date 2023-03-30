import UserForm from "../components/forms/UserForm";
import PropTypes from "prop-types";

const Login = ({ setToken }) => {
    Login.propTypes = {
        setToken: PropTypes.func,
    };
    return (
        <main>
            <h1>Connexion</h1>
            <UserForm page="login" setToken={setToken} />
        </main>
    );
};

export default Login;
