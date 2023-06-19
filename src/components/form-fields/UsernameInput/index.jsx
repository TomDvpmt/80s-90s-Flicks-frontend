import {
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
} from "../../../utils/formValidation";

import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const UsernameInput = ({ reducer }) => {
    UsernameInput.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const helperText = `Le nom d'utilisateur doit comporter au moins ${USERNAME_MIN_LENGTH} et au maximum ${USERNAME_MAX_LENGTH} caractères.`;

    const handleChange = (e) => {
        reducer.localDispatch({
            type: reducer.ACTIONS.setErrorMessage,
            payload: "",
        });
        reducer.localDispatch({
            type: reducer.ACTIONS.setShowUsernameError,
            payload: false,
        });
        reducer.localDispatch({
            type: reducer.ACTIONS.setUsername,
            payload: e.target.value,
        });
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
            value={reducer.state.username}
            onChange={handleChange}
            error={reducer.state.showUsernameError}
            helperText={reducer.state.showUsernameError && helperText}
        />
    );
};

export default UsernameInput;
