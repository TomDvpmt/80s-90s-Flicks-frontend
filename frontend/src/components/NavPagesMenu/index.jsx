import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserIsSignedIn } from "../../app/selectors";

import { logout } from "../../utils/user";

import { Box, Menu, MenuItem, IconButton, ListItemIcon } from "@mui/material";
import {
    Menu as MenuIcon,
    LocalMovies,
    PersonAdd,
    Settings,
    Login,
    Logout,
    Dashboard,
} from "@mui/icons-material";

const NavPagesMenu = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

    const getMenuItemsData = useCallback(
        () => [
            {
                name: "explore",
                label: "Explorer",
                icon: <LocalMovies />,
                limitation: null,
                linkTo: "/",
            },
            {
                name: "login",
                label: "Connexion",
                icon: <Login />,
                limitation: "signedOut",
                linkTo: "/login",
            },
            {
                name: "register",
                label: "Créer un compte",
                icon: <PersonAdd />,
                limitation: "signedOut",
                linkTo: "/register",
            },
            {
                name: "dashboard",
                label: "Mon tableau de bord",
                icon: <Dashboard />,
                limitation: "signedIn",
                linkTo: "/dashboard",
            },
            {
                name: "profile",
                label: "Mon profil",
                icon: <Settings />,
                limitation: "signedIn",
                linkTo: "/profile",
            },
            {
                name: "logout",
                label: "Déconnexion",
                icon: <Logout />,
                limitation: "signedIn",
                linkTo: "/login",
            },
        ],
        []
    );

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleLogout = useCallback(() => {
        setAnchorEl(null);
        logout(navigate);
    }, [navigate]);

    useEffect(() => {
        const menuItemsData = getMenuItemsData();
        setMenuItems(
            menuItemsData
                .filter((item) => {
                    return isSignedIn
                        ? item.limitation !== "signedOut"
                        : item.limitation !== "signedIn";
                })
                .map((item, index) => (
                    <MenuItem
                        key={index}
                        label={item.label}
                        component={Link}
                        to={item.linkTo}
                        onClick={
                            item.name === "logout" ? handleLogout : handleClose
                        }>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {item.label}
                    </MenuItem>
                ))
        );
    }, [isSignedIn, handleLogout, handleClose, getMenuItemsData]);

    return (
        <Box
            sx={{
                display: {
                    xs: "block",
                    sm: "none",
                },
            }}>
            <IconButton onClick={handleOpen}>
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                onClose={handleClose}>
                {menuItems}
            </Menu>
        </Box>
    );
};

export default NavPagesMenu;
