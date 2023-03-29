import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Menu, MenuItem, Avatar } from "@mui/material";

import fetchData from "../utils/fetchData";
import logout from "../utils/logout";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const token = localStorage.getItem("token");
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    console.log(token);

    const handleAvatarClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleProfileClick = () => {
        navigate("/profile");
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await fetchData(`${process.env.REACT_APP_API_URI}users/logout`, "POST");
        handleClose();
        logout(navigate);
    };

    return (
        <>
            {token && (
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
