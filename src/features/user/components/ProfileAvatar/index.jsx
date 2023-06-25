import { useSelector } from "react-redux";

import { selectUserAvatarUrl } from "../../../features/user/userSlice";

import theme from "../../../theme/theme";
import { Box, Badge, IconButton, Avatar } from "@mui/material";
import { Settings } from "@mui/icons-material";

const ProfileAvatar = ({ handleUpdateAvatar }) => {
    const avatarUrl = useSelector(selectUserAvatarUrl);

    return (
        <Box>
            <Badge
                badgeContent={
                    <IconButton onClick={handleUpdateAvatar}>
                        <Settings />
                    </IconButton>
                }
                sx={{
                    "& .MuiBadge-badge": {
                        top: "inherit",
                        bottom: "0",
                    },
                }}>
                <Avatar
                    sx={{
                        width: theme.maxWidth.profileAvatar,
                        height: theme.maxWidth.profileAvatar,
                    }}
                    src={avatarUrl}
                    alt="Avatar"
                />
            </Badge>
        </Box>
    );
};

export default ProfileAvatar;
