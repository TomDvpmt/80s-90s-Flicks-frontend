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
            Email *
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleChange}
                required
            />
        </label>
    );
};

export default EmailInput;
