import PropTypes from "prop-types";

const FirstNameInput = ({ firstName, setFirstName }) => {
    FirstNameInput.propTypes = {
        firstName: PropTypes.string,
        setFirstName: PropTypes.func,
    };

    const handleChange = (e) => {
        setFirstName(e.target.value);
    };

    return (
        <label htmlFor="firstName">
            First name
            <input
                type="firstName"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={handleChange}
            />
        </label>
    );
};

export default FirstNameInput;
