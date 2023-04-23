import { useSelector } from "react-redux";

import { selectTmdbImagesSecureUrl } from "../../services/utils/selectors";

import PropTypes from "prop-types";

const MoviePoster = ({ path, movieTitle }) => {
    MoviePoster.propTypes = {
        path: PropTypes.string.isRequired,
        movieTitle: PropTypes.string,
    };

    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());

    return (
        path !== null &&
        path !== "" && (
            <img
                src={`${imageBaseUrl}w500${path}`}
                alt={movieTitle + "(poster)"}
                width="100%"
            />
        )
    );
};

export default MoviePoster;
