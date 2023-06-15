import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const PasswordInput = ({ password, setPassword, setErrorMessage }) => {
    PasswordInput.propTypes = {
        password: PropTypes.string.isRequired,
        setPassword: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
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
            onFocus={() => setErrorMessage("")}
        />
    );
};

export default PasswordInput;
