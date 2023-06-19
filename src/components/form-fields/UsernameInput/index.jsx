import {
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
} from "../../../utils/formValidation";

import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const UsernameInput = ({
    username,
    setUsername,
    setErrorMessage,
    showUsernameError,
    setShowUsernameError,
}) => {
    UsernameInput.propTypes = {
        username: PropTypes.string.isRequired,
        setUsername: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
        showUsernameError: PropTypes.bool.isRequired,
        setShowUsernameError: PropTypes.func.isRequired,
    };

    const helperText = `Le nom d'utilisateur doit comporter au moins ${USERNAME_MIN_LENGTH} et au maximum ${USERNAME_MAX_LENGTH} caractères.`;

    const handleChange = (e) => {
        setErrorMessage("");
        setShowUsernameError(false);
        setUsername(e.target.value);
    };

    return (
        <TextField
            required
            margin="dense"
            fullWidth
            id="username"
            name="username"
            type="username"
            label="Nom d'utilisateur"
            value={username}
            onChange={handleChange}
            error={showUsernameError}
            helperText={showUsernameError && helperText}
        />
    );
};

export default UsernameInput;
