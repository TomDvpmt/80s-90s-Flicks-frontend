import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserAvatarUrl, selectUserIsSignedIn } from "../../app/selectors";

import { logout } from "../../utils/user";

import {
    Menu,
    MenuItem,
    IconButton,
    ListItemIcon,
    Avatar,
} from "@mui/material";
import { Settings, Logout, Dashboard } from "@mui/icons-material";

const NavUserMenu = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const avatarUrl = useSelector(selectUserAvatarUrl());
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

    const getMenuItemsData = useCallback(
        () => [
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
            menuItemsData.map((item, index) => (
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
        <>
            <IconButton onClick={handleOpen}>
                <Avatar
                    sx={{
                        width: "3rem",
                        height: "3rem",
                    }}
                    src={avatarUrl}
                    alt="Avatar"
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={handleClose}>
                {menuItems}
            </Menu>
        </>
    );
};

export default NavUserMenu;
