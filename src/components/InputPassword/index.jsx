import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../features/userSlice";

import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "../../config/form";

import theme from "../../styles/theme";

import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const InputPassword = ({ reducer }) => {
    InputPassword.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage);

    const helperText = `Le mot de passe doit comporter au moins ${PASSWORD_MIN_LENGTH} et au maximum ${PASSWORD_MAX_LENGTH} caractères.`;

    const handleChange = (e) => {
        reducer.localDispatch({
            type: reducer.ACTIONS.setErrorMessage,
            payload: "",
        });
        reducer.localDispatch({
            type: reducer.ACTIONS.setShowPasswordError,
            payload: false,
        });
        reducer.localDispatch({
            type: reducer.ACTIONS.setPassword,
            payload: e.target.value,
        });
    };

    return (
        <TextField
            required
            fullWidth
            margin="dense"
            // id="password"
            name="password"
            type="password"
            label={theme.languages[language].components.inputPassword}
            value={reducer.state.password}
            onChange={handleChange}
            error={reducer.state.showPasswordError}
            helperText={reducer.state.showPasswordError && helperText}
        />
    );
};

export default InputPassword;
