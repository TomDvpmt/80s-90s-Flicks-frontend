import PropTypes from "prop-types";

const UsernameInput = ({ username, setUsername }) => {
    UsernameInput.propTypes = {
        username: PropTypes.string,
        setUsername: PropTypes.func,
    };

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <label htmlFor="username">
            Username *
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={handleChange}
                required
            />
        </label>
    );
};

export default UsernameInput;
