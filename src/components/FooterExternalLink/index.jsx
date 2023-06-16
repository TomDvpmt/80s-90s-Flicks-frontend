import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../app/selectors";

import { Link } from "@mui/material";
import theme from "../../assets/styles/theme";

import PropTypes from "prop-types";

const FooterExternalLink = ({ type }) => {
    FooterExternalLink.propTypes = {
        type: PropTypes.string.isRequired,
    };

    const language = useSelector(selectUserLanguage());

    const LINKS = {
        tmdbAPI: {
            label: "The Movie Database",
            path: "https://developers.themoviedb.org/3",
        },
        mediaWikiAPI: {
            label: "MediaWiki",
            path: `https://www.mediawiki.org/wiki/API:Main_page/${language}`,
        },
        sourceCode: {
            label: "github.com/TomDvpmt",
            path: "https://github.com/TomDvpmt/80s-90s-Flicks-frontend",
        },
    };

    return (
        <Link
            href={LINKS[type].path}
            target="_blank"
            rel="noopener"
            underline="hover"
            color={theme.palette.text.darkBg}>
            {LINKS[type].label}
        </Link>
    );
};

export default FooterExternalLink;
