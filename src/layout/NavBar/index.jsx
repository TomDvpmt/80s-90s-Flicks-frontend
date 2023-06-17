import { useSelector } from "react-redux";

import NavExploreButtons from "../../components/NavExploreButtons";
import NavUserMenu from "../../components/NavUserMenu";
import NavLoginMenu from "../../components/NavLoginMenu";

import { selectUserIsSignedIn, selectUserUsername } from "../../app/selectors";

import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import theme from "../../assets/styles/theme";

const NavBar = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const username = useSelector(selectUserUsername());

    return (
        <AppBar
            component="nav"
            sx={{
                position: { xs: "sticky", sm: "static" },
                pr: "0 !important",
                backgroundColor: theme.palette.primary.main,
                flexDirection: "row",
                justifyContent: "center",
            }}>
            <Toolbar
                sx={{
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
                        fontSize="1.3rem">
                        {username}
                    </Typography>
                    {isSignedIn ? <NavUserMenu /> : <NavLoginMenu />}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
