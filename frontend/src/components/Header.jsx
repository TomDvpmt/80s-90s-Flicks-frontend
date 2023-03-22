import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & nav {
        background-color: #f5f5f5;
        flex-grow: 1;

        & li a {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <img src="" alt="" />
            <p>HEADER</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/profile">
                            <FaUser />
                            Profile
                        </Link>
                    </li>
                    <li></li>
                </ul>
            </nav>
        </StyledHeader>
    );
};

export default Header;
