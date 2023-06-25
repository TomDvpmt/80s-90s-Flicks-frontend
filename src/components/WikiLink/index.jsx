import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../features/user/userSlice";

import { Button, Link } from "@mui/material";
import theme from "../../theme/theme";

const WikiLink = ({ movieTitle }) => {
    const language = useSelector(selectUserLanguage);
    const movieFormatedName = movieTitle?.replace(" ", "_");

    return (
        <Button>
            <Link
                href={`https://${language}.wikipedia.org/wiki/${movieFormatedName}`}
                target="_blank"
                underline="none"
                sx={{
                    color: {
                        xs: theme.palette.text.lightBg,
                        md: theme.palette.text.darkBg,
                    },
                }}>
                {theme.languages[language].components.wikiLink}
            </Link>
        </Button>
    );
};

export default WikiLink;
