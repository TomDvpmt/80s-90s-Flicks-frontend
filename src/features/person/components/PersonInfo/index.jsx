import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../../user/userSlice";

import theme from "../../../../theme/theme";
import { Box, ButtonGroup, Button, Typography, Link } from "@mui/material";

const PersonInfo = ({ state }) => {
    const language = useSelector(selectUserLanguage);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
                gap: "2rem",
                "& img": {
                    maxWidth: "300px",
                },
            }}>
            {state.personImgUrl && (
                <img src={state.personImgUrl} alt={state.person.name} />
            )}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                <Typography>
                    <Typography component="span" fontWeight="700">
                        {theme.languages[language].pages.person.birth}{" "}
                    </Typography>
                    <Typography component="span">
                        {state.personFormatedBirthday}
                    </Typography>
                </Typography>
                {state.person.deathday && (
                    <Typography>
                        <Typography component="span" fontWeight="700">
                            {theme.languages[language].pages.person.death}{" "}
                        </Typography>
                        <Typography component="span">
                            {state.personFormatedDeathday}
                        </Typography>
                    </Typography>
                )}
                {state.person.biography && (
                    <Typography
                        align="justify"
                        sx={{
                            maxWidth: { md: theme.maxWidth.biography },
                        }}>
                        {state.person.biography}
                    </Typography>
                )}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: {
                            xs: "center",
                            md: "flex-start",
                        },
                    }}>
                    <ButtonGroup variant="outlined">
                        <Button size="small">
                            <Link
                                href={`https://${language}.wikipedia.org/wiki/${state.personFormatedName}`}
                                target="_blank"
                                underline="none"
                                color={theme.palette.text.lightBg}
                                fontWeight="400">
                                {theme.languages[language].components.wikiLink}
                            </Link>
                        </Button>
                        <Button size="small">
                            <Link
                                href={`https://www.imdb.com/name/${state.person.imdb_id}/`}
                                target="_blank"
                                underline="none"
                                color={theme.palette.text.lightBg}
                                fontWeight="400">
                                {theme.languages[language].components.imdbLink}
                            </Link>
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
        </Box>
    );
};

export default PersonInfo;
