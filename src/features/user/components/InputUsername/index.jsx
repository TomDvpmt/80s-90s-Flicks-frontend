import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../userSlice";
import { selectPageLocation } from "../../../navigation/navigationSlice";

import {
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
} from "../../../../config/form";

import theme from "../../../../theme/theme";
import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const InputUsername = ({ reducer }) => {
    InputUsername.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage);
    const page = useSelector(selectPageLocation);

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
            autoFocus={page !== "profile"}
            required
            margin="dense"
            fullWidth
            // id="username"
            name="username"
            type="username"
            label={theme.languages[language].components.inputUsername}
            value={reducer.state.username}
            onChange={handleChange}
            error={reducer.state.showUsernameError}
            helperText={reducer.state.showUsernameError && helperText}
        />
    );
};

export default InputUsername;
