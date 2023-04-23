import { useSelector } from "react-redux";

import {
    selectTmdbImagesSecureUrl,
    selectTmdbImagesPosterSizes,
    selectPageLocation,
} from "../../services/utils/selectors";

import defaultPoster from "../../assets/img/defaultPoster.jpeg";

import PropTypes from "prop-types";

const MoviePoster = ({ path, movieTitle }) => {
    MoviePoster.propTypes = {
        path: PropTypes.string.isRequired,
        movieTitle: PropTypes.string,
    };

    const page = useSelector(selectPageLocation());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());
    const posterSizes = useSelector(selectTmdbImagesPosterSizes());

    let posterSize;
    switch (page) {
        case "home":
            posterSize = posterSizes[3];
            break;
        case "movie":
            posterSize = posterSizes[5];
            break;
        default:
            posterSize = posterSizes[2];
    }

    const hasPoster = path !== null && path !== "";
    const imgSrc = hasPoster
        ? `${imageBaseUrl}${posterSize}${path}`
        : defaultPoster;

    return <img src={imgSrc} alt={movieTitle + "(poster)"} />;
};

export default MoviePoster;
