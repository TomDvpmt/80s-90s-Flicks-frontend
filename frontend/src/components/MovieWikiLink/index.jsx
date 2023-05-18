import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../app/selectors";

import { Button, Link } from "@mui/material";

const MovieWikiLink = ({ movieTitle }) => {
    const language = useSelector(selectUserLanguage());
    const movieFormatedName = movieTitle?.replace(" ", "_");

    return (
        <Button>
            <Link
                href={`https://${language}.wikipedia.org/wiki/${movieFormatedName}`}
                target="_blank"
                underline="none">
                Voir sur Wikipédia
            </Link>
        </Button>
    );
};

export default MovieWikiLink;
