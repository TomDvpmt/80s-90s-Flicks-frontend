import PropTypes from "prop-types";
import styled from "styled-components";

const StyledErrorMessage = styled.p`
    color: red;
`;

const ErrorMessage = ({ errorMessage }) => {
    ErrorMessage.propTypes = {
        errorMessage: PropTypes.string,
    };

    return (
        <>
            {errorMessage && (
                <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
            )}
        </>
    );
};

export default ErrorMessage;
