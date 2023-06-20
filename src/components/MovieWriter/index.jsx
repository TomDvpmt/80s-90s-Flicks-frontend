import { Link as RouterLink } from "react-router-dom";

import theme from "../../styles/theme";
import { Typography, Link } from "@mui/material";

import PropTypes from "prop-types";

const MovieWriter = ({ writer }) => {
    MovieWriter.propTypes = {
        writer: PropTypes.object.isRequired,
    };

    return (
        <Typography component="span">
            <Link
                component={RouterLink}
                className="credit--strong"
                to={`/person/${writer.id}`}
                underline="hover"
                color={theme.palette.text.lightBg}>
                {writer.name}
            </Link>
        </Typography>
    );
};

export default MovieWriter;
