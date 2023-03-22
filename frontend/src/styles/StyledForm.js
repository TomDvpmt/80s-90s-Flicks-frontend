import styled from "styled-components";

const StyledForm = styled.section`
    form {
        max-width: max-content;
        margin: auto;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 0.5rem;

        input {
            margin-left: 0.5rem;
        }

        a {
            text-align: right;
        }
    }
`;

export default StyledForm;
