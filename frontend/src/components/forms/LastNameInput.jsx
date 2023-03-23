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
        <label htmlFor="lastName">
            Last name
            <input
                type="lastName"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={handleChange}
            />
        </label>
    );
};

export default LastNameInput;
