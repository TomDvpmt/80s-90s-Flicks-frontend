import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectPageLocation } from "../../features/pageSlice";

import theme from "../../styles/theme";
import { Typography, Link } from "@mui/material";

import PropTypes from "prop-types";

const MovieActor = ({ actor }) => {
    MovieActor.propTypes = {
        actor: PropTypes.object.isRequired,
    };

    const page = useSelector(selectPageLocation);

    return page === "home" || page === "dashboard" ? (
        <Typography component="span">{actor.name}</Typography>
    ) : (
        <Typography component="span">
            <Link
                component={RouterLink}
                className="credit--strong"
                to={`/person/${actor.id}`}
                underline="hover"
                color={theme.palette.text.lightBg}>
                {actor.name}
            </Link>
        </Typography>
    );
};

export default MovieActor;
