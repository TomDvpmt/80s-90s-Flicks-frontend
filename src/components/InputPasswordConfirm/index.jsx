import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../features/userSlice";

import theme from "../../styles/theme";

import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const InputPasswordConfirm = ({ reducer }) => {
    InputPasswordConfirm.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage);

    const helperText = `Les mots de passe ne correspondent pas.`;

    const handleChange = (e) => {
        reducer.localDispatch({
            type: reducer.ACTIONS.setErrorMessage,
            payload: "",
        });
        reducer.localDispatch({
            type: reducer.ACTIONS.setShowPasswordConfirmError,
            payload: false,
        });
        reducer.localDispatch({
            type: reducer.ACTIONS.setPasswordConfirm,
            payload: e.target.value,
        });
    };

    return (
        <TextField
            required
            fullWidth
            margin="dense"
            // id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            label={theme.languages[language].components.inputPasswordConfirm}
            value={reducer.state.passwordConfirm}
            onChange={handleChange}
            error={reducer.state.showPasswordConfirmError}
            helperText={reducer.state.showPasswordConfirmError && helperText}
        />
    );
};

export default InputPasswordConfirm;
