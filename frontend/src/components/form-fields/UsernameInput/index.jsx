import { TextField } from "@mui/material";

import PropTypes from "prop-types";

const UsernameInput = ({ username, setUsername, setErrorMessage }) => {
    UsernameInput.propTypes = {
        username: PropTypes.string,
        setUsername: PropTypes.func,
        setErrorMessage: PropTypes.func,
    };

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    // const handleFocus = () => {
    //     setErrorMessage("");
    // };

    return (
        <TextField
            autoFocus
            required
            margin="dense"
            fullWidth
            id="username"
            name="username"
            type="username"
            label="Nom d'utilisateur"
            value={username}
            onChange={handleChange}
            // onFocus={handleFocus}
            // error={usernameError !== ""}
        />
    );
};

export default UsernameInput;
