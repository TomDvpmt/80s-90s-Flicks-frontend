import { TextField } from "@mui/material";
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
            // onFocus={handleFocus}
            // error={passwordError !== ""}
        />
    );
};

export default PasswordInput;
