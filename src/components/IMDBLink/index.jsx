import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../features/userSlice";

import theme from "../../styles/theme";
import { Button, Link } from "@mui/material";

import PropTypes from "prop-types";

const IMDBLink = ({ imdbId }) => {
    IMDBLink.propTypes = {
        imdbId: PropTypes.string,
    };

    const language = useSelector(selectUserLanguage);

    return (
        imdbId !== undefined &&
        imdbId !== null &&
        imdbId !== "" && (
            <Button>
                <Link
                    href={`https://www.imdb.com/title/${imdbId}/`}
                    target="_blank"
                    underline="none"
                    sx={{
                        color: {
                            xs: theme.palette.text.lightBg,
                            md: theme.palette.text.darkBg,
                        },
                    }}>
                    {theme.languages[language].components.imdbLink}
                </Link>
            </Button>
        )
    );
};

export default IMDBLink;
