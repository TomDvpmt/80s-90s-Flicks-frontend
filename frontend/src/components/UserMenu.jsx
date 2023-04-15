import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, IconButton, Menu, MenuItem, Avatar } from "@mui/material";

import logout from "../utils/logout";

import { selectUserIsSignedIn } from "../services/utils/selectors";

const UserMenu = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn());

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAvatarClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleProfileClick = () => {
        navigate("/profile");
        handleClose();
    };

    const handleLogout = async () => {
        handleClose();
        logout(navigate);
    };

    return (
        <>
            {isSignedIn && (
                <Box>
                    <IconButton onClick={handleAvatarClick}>
                        <Avatar sx={{ width: "2.5rem", height: "2.5rem" }} />
                    </IconButton>
                    <Menu
                        open={open}
                        onClose={handleClose}
                        anchorEl={anchorEl}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}>
                        <MenuItem onClick={handleProfileClick}>Profil</MenuItem>
                        <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                    </Menu>
                </Box>
            )}
        </>
    );
};

export default UserMenu;
