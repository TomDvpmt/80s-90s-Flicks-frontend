import PropTypes from "prop-types";

const UsernameInput = ({ username, setUsername, setErrorMessage }) => {
    UsernameInput.propTypes = {
        username: PropTypes.string,
        setUsername: PropTypes.func,
        setErrorMessage: PropTypes.func,
    };

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleFocus = () => {
        setErrorMessage("");
    };

    return (
        <label htmlFor="username">
            Nom d'utilisateur *
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={handleChange}
                onFocus={handleFocus}
                required
                autoFocus
            />
        </label>
    );
};

export default UsernameInput;
