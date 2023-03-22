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
            Password *
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
                required
            />
        </label>
    );
};

export default PasswordInput;
