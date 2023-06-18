import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const FirstNameInput = ({ firstName, setFirstName, setErrorMessage }) => {
    FirstNameInput.propTypes = {
        firstName: PropTypes.string.isRequired,
        setFirstName: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        setFirstName(e.target.value);
    };

    return (
        <TextField
            // autoFocus={hasAutoFocus}
            fullWidth
            margin="dense"
            id="firstName"
            name="firstName"
            type="text"
            label="Prénom"
            value={firstName}
            onChange={handleChange}
            onFocus={() => setErrorMessage("")}
            // error={firstNameError !== ""}
        />
    );
};

export default FirstNameInput;
