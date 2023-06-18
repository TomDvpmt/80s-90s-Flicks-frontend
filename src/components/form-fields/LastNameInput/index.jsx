import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const LastNameInput = ({ lastName, setLastName, setErrorMessage }) => {
    LastNameInput.propTypes = {
        lastName: PropTypes.string.isRequired,
        setLastName: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
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
            onFocus={() => setErrorMessage("")}
            // error={lastNameError !== ""}
        />
    );
};

export default LastNameInput;
