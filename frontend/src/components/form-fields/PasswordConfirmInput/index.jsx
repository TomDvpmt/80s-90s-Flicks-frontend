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
            Confirmation du mot de passe *
            <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Confirmez votre mot de passe"
                value={passwordConfirm}
                onChange={handleChange}
                required
            />
        </label>
    );
};

export default PasswordConfirmInput;
