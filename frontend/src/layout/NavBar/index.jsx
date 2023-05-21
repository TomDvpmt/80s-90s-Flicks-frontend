import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import NavUserMenu from "../../components/NavUserMenu";
import NavPagesMenu from "../../components/NavPagesMenu";

import { selectUserIsSignedIn, selectUserUsername } from "../../app/selectors";

import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import theme from "../../assets/styles/theme";

const NavBar = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const username = useSelector(selectUserUsername());

    return (
        <AppBar
            component="nav"
            sx={{
                position: { xs: "sticky", sm: "static" },
                backgroundColor: theme.palette.primary.main,
                flexDirection: "row",
                justifyContent: "center",
            }}>
            <Toolbar
                sx={{
                    flexGrow: 1,
                    maxWidth: theme.maxWidth.nav,
                }}>
                <NavPagesMenu />
                <Box
                    sx={{
                        flexGrow: 1,
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
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
                            <NavUserMenu />
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
