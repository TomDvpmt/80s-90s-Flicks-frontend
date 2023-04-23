import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    selectUserMoviesToSee,
    selectUserMoviesSeen,
    selectUserFavorites,
    selectUserLanguage,
} from "../../services/utils/selectors";

import {
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Link,
} from "@mui/material";
import { LocalMovies, Check, Favorite } from "@mui/icons-material";

import theme from "../../assets/styles/theme";

const SideNav = () => {
    const moviesToSee = useSelector(selectUserMoviesToSee());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const favorites = useSelector(selectUserFavorites());
    const language = useSelector(selectUserLanguage());

    const sideNavLinks = [];

    class SideNavLink {
        constructor(movies, tag, icon) {
            this.primary =
                theme.languages[language].components.sideNav.primary[tag];
            this.secondary = `${theme.languages[language].components.sideNav.secondary} ${movies.length}`;
            this.url = tag;
            this.icon = icon;

            sideNavLinks.push(this);
        }
    }

    new SideNavLink(moviesToSee, "toSee", <LocalMovies />);
    new SideNavLink(moviesSeen, "seen", <Check />);
    new SideNavLink(favorites, "favorites", <Favorite />);

    return (
        <>
            <Paper
                component="nav"
                elevation={4}
                sx={{
                    bgcolor: "white",
                    width: { xs: "100%", sm: "auto" },
                    minWidth: "200px",
                    position: "sticky",
                    top: "0",
                    zIndex: "99",
                }}>
                <List
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "row",
                            sm: "column",
                        },
                    }}>
                    {sideNavLinks.map((item, index) => {
                        return (
                            <ListItem
                                key={index}
                                sx={{
                                    justifyContent: {
                                        xs: "center",
                                        sm: "flex-start",
                                    },
                                }}>
                                <Link
                                    component={RouterLink}
                                    variant="button"
                                    to={`/dashboard/#${item.url}`}
                                    underline="none"
                                    sx={{ flexGrow: "1" }}>
                                    <ListItemButton
                                        sx={{
                                            padding: {
                                                xs: "0 .5rem",
                                            },

                                            flexDirection: {
                                                xs: "column",
                                                sm: "row",
                                            },
                                            justifyContent: {
                                                xs: "flex-start",
                                            },
                                        }}>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: "0",
                                                color: theme.palette.primary
                                                    .main,
                                                justifyContent: {
                                                    xs: "center",
                                                },
                                            }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.primary}
                                            secondary={item.secondary}
                                            sx={{
                                                display: {
                                                    xs: "none",
                                                    sm: "block",
                                                },
                                                color: theme.palette.primary
                                                    .main,
                                                textAlign: {
                                                    xs: "center",
                                                },
                                            }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </>
    );
};

export default SideNav;
