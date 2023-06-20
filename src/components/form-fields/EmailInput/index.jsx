import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const EmailInput = ({ reducer }) => {
    EmailInput.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const helperText = `Format d'adresse e-mail incorrect.`;

    const handleChange = (e) => {
        reducer.localDispatch({
            type: reducer.ACTIONS.setErrorMessage,
            payload: "",
        });
        reducer.localDispatch({
            type: reducer.ACTIONS.setShowEmailError,
            payload: false,
        });
        reducer.localDispatch({
            type: reducer.ACTIONS.setEmail,
            payload: e.target.value,
        });
    };

    return (
        <TextField
            required
            fullWidth
            margin="dense"
            // id="email"
            name="email"
            type="text"
            label="Adresse e-mail"
            value={reducer.state.email}
            onChange={handleChange}
            error={reducer.state.showEmailError}
            helperText={reducer.state.showEmailError && helperText}
        />
    );
};

export default EmailInput;
