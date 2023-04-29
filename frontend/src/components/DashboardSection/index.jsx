import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MovieCardsGrid from "../MovieCardsGrid";

import {
    selectPageLocation,
    selectUserLanguage,
} from "../../services/utils/selectors";

import { Paper, Typography } from "@mui/material";
import theme from "../../assets/styles/theme";

import PropTypes from "prop-types";

const DashboardSection = ({ categoryId, movies }) => {
    DashboardSection.propTypes = {
        categoryId: PropTypes.string.isRequired,
        movies: PropTypes.arrayOf(PropTypes.object.isRequired),
    };

    const page = useSelector(selectPageLocation());
    const language = useSelector(selectUserLanguage());

    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(theme.languages[language].pages.dashboard.titles[categoryId]);
    }, [page, language, categoryId]);

    return (
        <Paper
            component="section"
            elevation={4}
            sx={{
                padding: "1rem",
            }}>
            <Typography id={categoryId} component="h2" variant="h2" mb="1rem">
                {title}
            </Typography>
            <MovieCardsGrid movies={movies} />
        </Paper>
    );
};

export default DashboardSection;
