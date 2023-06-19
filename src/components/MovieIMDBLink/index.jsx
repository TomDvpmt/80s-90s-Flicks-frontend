import { Button, Link } from "@mui/material";
import theme from "../../styles/theme";

import PropTypes from "prop-types";

const MovieIMDBLink = ({ imdbId, imdbLang }) => {
    MovieIMDBLink.propTypes = {
        imdbId: PropTypes.string,
        imdbLang: PropTypes.string.isRequired,
    };
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
                    {imdbLang}
                </Link>
            </Button>
        )
    );
};

export default MovieIMDBLink;
