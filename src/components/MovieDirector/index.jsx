import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectUserIsSignedIn } from "../../features/userSlice";
import { selectPageLocation, setDestination } from "../../features/pageSlice";
import { setShowLoggedOnlyDialog } from "../../features/dialogsSlice";

import theme from "../../styles/theme";
import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieDirector = ({ director }) => {
    MovieDirector.propTypes = {
        director: PropTypes.object.isRequired,
    };

    const isSignedIn = useSelector(selectUserIsSignedIn);
    const page = useSelector(selectPageLocation);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        const destination = `/person/${e.target.id}`;
        if (!isSignedIn) {
            dispatch(setDestination(destination));
            dispatch(setShowLoggedOnlyDialog(true));
            return;
        }
        navigate(destination);
    };

    return (
        <Typography component="span">
            {page === "movie" ? (
                <>
                    <Typography
                        id={director.id}
                        component="span"
                        className="credit--strong"
                        color={theme.palette.text.lightBg}
                        onClick={handleClick}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                                cursor: "pointer",
                            },
                        }}>
                        {director.name}
                    </Typography>
                </>
            ) : (
                <>
                    <Typography component="span" className="credit--strong">
                        {director.name}
                    </Typography>
                </>
            )}
        </Typography>
    );
};

export default MovieDirector;
