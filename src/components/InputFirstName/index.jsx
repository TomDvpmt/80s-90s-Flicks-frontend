import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../features/userSlice";

import theme from "../../styles/theme";

import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const InputFirstName = ({ reducer }) => {
    InputFirstName.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage);

    const handleChange = (e) => {
        reducer.localDispatch({
            type: reducer.ACTIONS.setErrorMessage,
            payload: "",
        });
        reducer.localDispatch({
            type: reducer.ACTIONS.setFirstName,
            payload: e.target.value,
        });
    };

    return (
        <TextField
            fullWidth
            margin="dense"
            name="firstName"
            type="text"
            label={theme.languages[language].components.inputFirstName}
            value={reducer.state.firstName}
            onChange={handleChange}
        />
    );
};

export default InputFirstName;
