import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../userSlice";

import theme from "../../../../theme/theme";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const InputLastName = ({ reducer }) => {
    InputLastName.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage);

    const handleChange = (e) => {
        reducer.localDispatch({
            type: reducer.ACTIONS.setErrorMessage,
            payload: "",
        });
        reducer.localDispatch({
            type: reducer.ACTIONS.setLastName,
            payload: e.target.value,
        });
    };

    return (
        <TextField
            fullWidth
            margin="dense"
            // id="LastName"
            name="LastName"
            type="text"
            label={theme.languages[language].components.inputLastName}
            value={reducer.state.lastName}
            onChange={handleChange}
        />
    );
};

export default InputLastName;
