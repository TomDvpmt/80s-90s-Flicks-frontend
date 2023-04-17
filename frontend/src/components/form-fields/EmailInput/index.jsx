import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const EmailInput = ({ email, setEmail }) => {
    EmailInput.propTypes = {
        email: PropTypes.string,
        setEmail: PropTypes.func,
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
            // onFocus={handleFocus}
            // error={emailError !== ""}
        />
    );
};

export default EmailInput;
