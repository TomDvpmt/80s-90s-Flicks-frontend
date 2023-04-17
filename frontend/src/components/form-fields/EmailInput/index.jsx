import PropTypes from "prop-types";

const EmailInput = ({ email, setEmail }) => {
    EmailInput.propTypes = {
        email: PropTypes.string,
        setEmail: PropTypes.func,
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <label htmlFor="email">
            E-mail *
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Votre adresse e-mail"
                value={email}
                onChange={handleChange}
                required
            />
        </label>
    );
};

export default EmailInput;
