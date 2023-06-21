import { useSelector } from "react-redux";

import NavExploreButtons from "../../components/NavExploreButtons";
import NavUserMenu from "../../components/NavUserMenu";
import NavLoginMenu from "../../components/NavLoginMenu";

import {
    selectUserIsSignedIn,
    selectUserUsername,
} from "../../features/userSlice";

import { Box, AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";

const NavBar = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn);
    const username = useSelector(selectUserUsername);

    const isSmallestScreen = useMediaQuery("(max-width: 400px)");

    return (
        <AppBar
            component="nav"
            sx={{
                position: {
                    xs: "sticky",
                    // sm: "static"
                },
                pr: "0 !important",
                backgroundColor: theme.palette.background.darkest,
                flexDirection: "row",
                justifyContent: "center",
            }}>
            <Toolbar
                sx={{
                    p: isSmallestScreen ? "0" : "auto",
                    flexGrow: 1,
                    maxWidth: theme.maxWidth.nav,
                    justifyContent: "space-between",
                }}>
                <NavExploreButtons />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                    }}>
                    <Typography
                        component="span"
                        color="white"
                        fontSize="1.3rem"
                        fontWeight="700">
                        {username}
                    </Typography>
                    {isSignedIn ? <NavUserMenu /> : <NavLoginMenu />}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
