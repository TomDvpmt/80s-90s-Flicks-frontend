import { useSelector } from "react-redux";
import { selectUserLanguage } from "../../features/userSlice";

import theme from "../../styles/theme";
import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const InputEmail = ({ reducer }) => {
    InputEmail.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage);

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
            label={theme.languages[language].components.inputEmail}
            value={reducer.state.email}
            onChange={handleChange}
            error={reducer.state.showEmailError}
            helperText={reducer.state.showEmailError && helperText}
        />
    );
};

export default InputEmail;
