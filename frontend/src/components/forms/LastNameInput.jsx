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
            Nom
            <input
                type="lastName"
                id="lastName"
                name="lastName"
                placeholder="Entrez votre nom"
                value={lastName}
                onChange={handleChange}
            />
        </label>
    );
};

export default LastNameInput;
