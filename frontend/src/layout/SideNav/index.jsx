import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ScrollToHashElement from "../../components/ScrollToHashElement";

import {
    selectUserMoviesToSee,
    selectUserMoviesSeen,
    selectUserFavorites,
} from "../../services/utils/selectors";

import {
    Box,
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

    const sideNavLinks = [
        {
            primary: "À voir",
            secondary: `Total : ${moviesToSee.length}`,
            url: "toSee",
            icon: <LocalMovies />,
        },
        {
            primary: "Déjà vus",
            secondary: `Total : ${moviesSeen.length}`,
            url: "seen",
            icon: <Check />,
        },
        {
            primary: "Favoris",
            secondary: `Total : ${favorites.length}`,
            url: "favorites",
            icon: <Favorite />,
        },
    ];

    return (
        <>
            <ScrollToHashElement />
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
