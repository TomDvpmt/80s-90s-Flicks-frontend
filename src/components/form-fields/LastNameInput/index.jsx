import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const LastNameInput = ({ reducer }) => {
    LastNameInput.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

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
            id="LastName"
            name="LastName"
            type="text"
            label="Nom"
            value={reducer.state.lastName}
            onChange={handleChange}
        />
    );
};

export default LastNameInput;
