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
            Confirm password *
            <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Enter your password again"
                value={passwordConfirm}
                onChange={handleChange}
                required
            />
        </label>
    );
};

export default PasswordConfirmInput;
