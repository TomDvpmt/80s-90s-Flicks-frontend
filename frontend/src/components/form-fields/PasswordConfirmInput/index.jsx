import PropTypes from "prop-types";

const PasswordConfirmInput = ({ passwordConfirm, setPasswordConfirm }) => {
    PasswordConfirmInput.propTypes = {
        passwordConfirm: PropTypes.string,
        setPasswordConfirm: PropTypes.func,
    };

    const handleChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    return (
        <label htmlFor="passwordConfirm">
            Password confirmation *
            <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirm your password"
                value={passwordConfirm}
                onChange={handleChange}
                required
            />
        </label>
    );
};

export default PasswordConfirmInput;
