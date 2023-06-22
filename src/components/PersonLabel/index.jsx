import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectUserToken } from "../../features/userSlice";
import { selectPageLocation } from "../../features/pageSlice";

import { setDestination } from "../../features/pageSlice";
import { setShowLoggedOnlyDialog } from "../../features/dialogsSlice";

import theme from "../../styles/theme";
import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const PersonLabel = ({ person, isStrong, isLink }) => {
    PersonLabel.propTypes = {
        person: PropTypes.object.isRequired,
        isStrong: PropTypes.bool.isRequired,
        isLink: PropTypes.bool.isRequired,
    };
    const token = useSelector(selectUserToken);
    const page = useSelector(selectPageLocation);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        const destination = `/person/${person.id}`;
        dispatch(setDestination(destination));
        if (!isLink) return;

        if (!token) {
            console.log(" destination : ", destination);
            dispatch(setShowLoggedOnlyDialog(true));
            return;
        }
        navigate(destination);
    };

    const linkStyle = {
        "&:hover": isLink && {
            textDecoration: "underline",
            cursor: "pointer",
        },
    };

    return (
        <Typography
            id={person.id}
            component="span"
            className={isStrong ? "credit--strong" : "credit"}
            color={
                page === "movie"
                    ? {
                          xs: theme.palette.text.lightBg,
                          md: theme.palette.text.darkBg,
                      }
                    : theme.palette.text.darkBg
            }
            onClick={handleClick}
            sx={linkStyle}>
            {person.name}
        </Typography>
    );
};

export default PersonLabel;
