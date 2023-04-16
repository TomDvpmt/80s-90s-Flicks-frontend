import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Branding from "../components/Branding";
import UserMenu from "../components/UserMenu";

import {
    selectUserIsSignedIn,
    selectUserUsername,
} from "../services/utils/selectors";

import { setUserInfo } from "../utils/requests";

import { Box, Toolbar, Button, Typography } from "@mui/material";
import theme from "../assets/styles/theme";

const Header = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const username = useSelector(selectUserUsername());

    return (
        <Box component="header">
            <Branding location="header" />
            <Toolbar
                sx={{
                    backgroundColor: theme.palette.tertiary.main,
                    justifyContent: "center",
                }}>
                <Box
                    component="nav"
                    sx={{
                        flex: 1,
                        maxWidth: theme.maxWidth.nav.desktop,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <Box>
                        <Button
                            component={NavLink}
                            to="/"
                            sx={{ color: "white" }}>
                            Explorer
                        </Button>
                        {isSignedIn && (
                            <Button
                                component={NavLink}
                                to="/dashboard"
                                sx={{ color: "white" }}>
                                Mon tableau de bord
                            </Button>
                        )}
                        {!isSignedIn && (
                            <>
                                <Button
                                    component={NavLink}
                                    to="/login"
                                    sx={{ color: "white" }}>
                                    Se connecter
                                </Button>
                                <Button
                                    component={NavLink}
                                    to="/register"
                                    sx={{ color: "white" }}>
                                    Créer un compte
                                </Button>
                            </>
                        )}
                    </Box>

                    {isSignedIn && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography component="span" color="white">
                                {username}
                            </Typography>
                            <UserMenu />
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </Box>
    );
};

export default Header;
