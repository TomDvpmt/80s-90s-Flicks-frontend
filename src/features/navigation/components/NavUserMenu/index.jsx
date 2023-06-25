import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    selectToken,
    selectUserAvatarUrl,
    selectUserLanguage,
} from "../../../user/userSlice";

import { API_BASE_URI } from "../../../../config/APIs";
import useFetch from "../../../../hooks/useFetch";
import { logout } from "../../../user/userUtils";

import Loader from "../../../../components/Loader";

import theme from "../../../../theme/theme";
import {
    Menu,
    MenuItem,
    IconButton,
    ListItemIcon,
    Avatar,
} from "@mui/material";
import { Settings, Logout, Dashboard } from "@mui/icons-material";

const NavUserMenu = () => {
    const token = useSelector(selectToken);
    const language = useSelector(selectUserLanguage);
    const avatarUrl = useSelector(selectUserAvatarUrl);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

    const response = useFetch(`${API_BASE_URI}/API/config/initialize`);
    const isLoading = response.isLoading;

    const getMenuItemsData = useCallback(
        () => [
            {
                name: "dashboard",
                label: theme.languages[language].navigation.dashboard,
                icon: <Dashboard />,
                linkTo: "/dashboard",
            },
            {
                name: "profile",
                label: theme.languages[language].navigation.profile,
                icon: <Settings />,
                linkTo: "/profile",
            },
            {
                name: "logout",
                label: theme.languages[language].navigation.logout,
                icon: <Logout />,
                linkTo: "/login",
            },
        ],
        [language]
    );

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleLogout = useCallback(
        (e) => {
            e.preventDefault();
            logout(navigate);
            setAnchorEl(null);
        },
        [navigate]
    );

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
    }, [token, handleLogout, handleClose, getMenuItemsData]);

    return isLoading ? (
        <Loader
            size={theme.maxWidth.loader.small}
            marginY={theme.maxWidth.loader.small}
        />
    ) : (
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
