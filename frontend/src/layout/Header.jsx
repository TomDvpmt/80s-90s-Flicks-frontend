import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Branding from "../components/Branding";
import UserMenu from "../components/UserMenu";

import { selectUserIsSignedIn } from "../services/utils/selectors";

import { Box, Toolbar, Button } from "@mui/material";
import { theme } from "../assets/styles/theme";

const Header = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn());

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
                        maxWidth: theme.maxWidth.desktop,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <Box>
                        <Button
                            component={NavLink}
                            to="/"
                            sx={{ color: "white" }}>
                            Explore
                        </Button>
                        {isSignedIn && (
                            <Button
                                component={NavLink}
                                to="/dashboard"
                                sx={{ color: "white" }}>
                                My Dashboard
                            </Button>
                        )}
                        {!isSignedIn && (
                            <>
                                <Button
                                    component={NavLink}
                                    to="/login"
                                    sx={{ color: "white" }}>
                                    Log In
                                </Button>
                                <Button
                                    component={NavLink}
                                    to="/register"
                                    sx={{ color: "white" }}>
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>
                    {isSignedIn && <UserMenu />}
                </Box>
            </Toolbar>
        </Box>
    );
};

export default Header;
