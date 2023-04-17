import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const LastNameInput = ({ lastName, setLastName }) => {
    LastNameInput.propTypes = {
        lastName: PropTypes.string,
        setLastName: PropTypes.func,
    };

    const handleChange = (e) => {
        setLastName(e.target.value);
    };

    return (
        <TextField
            fullWidth
            margin="dense"
            id="LastName"
            name="LastName"
            type="text"
            label="Nom"
            value={lastName}
            onChange={handleChange}
            // onFocus={handleFocus}
            // error={lastNameError !== ""}
        />
    );
};

export default LastNameInput;
