import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
} from "../../../utils/formValidation";

import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const PasswordInput = ({
    password,
    setPassword,
    setErrorMessage,
    showPasswordError,
    setShowPasswordError,
}) => {
    PasswordInput.propTypes = {
        password: PropTypes.string.isRequired,
        setPassword: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
        showPasswordError: PropTypes.bool.isRequired,
        setShowPasswordError: PropTypes.func.isRequired,
    };

    const helperText = `Le mot de passe doit comporter au moins ${PASSWORD_MIN_LENGTH} et au maximum ${PASSWORD_MAX_LENGTH} caractères.`;

    const handleChange = (e) => {
        setErrorMessage("");
        setShowPasswordError(false);
        setPassword(e.target.value);
    };

    return (
        <TextField
            required
            fullWidth
            margin="dense"
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            value={password}
            onChange={handleChange}
            error={showPasswordError}
            helperText={showPasswordError && helperText}
        />
    );
};

export default PasswordInput;
