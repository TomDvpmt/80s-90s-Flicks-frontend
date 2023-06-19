import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const FirstNameInput = ({ reducer }) => {
    FirstNameInput.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

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
            id="firstName"
            name="firstName"
            type="text"
            label="Prénom"
            value={reducer.state.firstName}
            onChange={handleChange}
        />
    );
};

export default FirstNameInput;
