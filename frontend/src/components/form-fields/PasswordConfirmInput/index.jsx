import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const PasswordConfirmInput = ({
    passwordConfirm,
    setPasswordConfirm,
    setErrorMessage,
}) => {
    PasswordConfirmInput.propTypes = {
        passwordConfirm: PropTypes.string.isRequired,
        setPasswordConfirm: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    return (
        <TextField
            required
            fullWidth
            margin="dense"
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            label="Confirmez votre mot de passe"
            value={passwordConfirm}
            onChange={handleChange}
            onFocus={() => setErrorMessage("")}
            // error={passwordConfirmError !== ""}
        />
    );
};

export default PasswordConfirmInput;
