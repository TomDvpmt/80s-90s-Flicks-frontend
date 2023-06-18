import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const EmailInput = ({ email, setEmail, setErrorMessage }) => {
    EmailInput.propTypes = {
        email: PropTypes.string.isRequired,
        setEmail: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <TextField
            // autoFocus={hasAutoFocus}
            required
            fullWidth
            margin="dense"
            id="email"
            name="email"
            type="email"
            label="Adresse e-mail"
            value={email}
            onChange={handleChange}
            onFocus={() => setErrorMessage("")}
            // error={emailError !== ""}
        />
    );
};

export default EmailInput;
