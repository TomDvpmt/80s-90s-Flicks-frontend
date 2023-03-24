import PropTypes from "prop-types";

const PasswordInput = ({ password, setPassword }) => {
    PasswordInput.propTypes = {
        password: PropTypes.string,
        setPassword: PropTypes.func,
    };

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <label htmlFor="password">
            Mot de passe *
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={handleChange}
                required
            />
        </label>
    );
};

export default PasswordInput;
