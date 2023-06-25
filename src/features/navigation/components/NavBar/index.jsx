import { useSelector } from "react-redux";

import {
    selectToken,
    selectUserUsername,
} from "../../../../features/user/userSlice";

import NavExploreButtons from "../NavExploreButtons";
import NavUserMenu from "../NavUserMenu";
import NavAuthMenu from "../NavAuthMenu";

import theme from "../../../../theme/theme";
import { Box, AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";

const NavBar = () => {
    const token = useSelector(selectToken);
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
                    {token ? <NavUserMenu /> : <NavAuthMenu />}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
