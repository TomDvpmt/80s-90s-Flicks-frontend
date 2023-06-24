import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    selectUserLanguage,
    updateAvatar,
    selectUserAvatarUrl,
    selectUserId,
} from "../../features/userSlice";
import {
    setShowUserAvatarUpdateDialog,
    selectShowUserAvatarUpdateDialog,
} from "../../features/dialogsSlice";

import { API_BASE_URI, IMGBB_BASE_URI } from "../../config/APIs";
import { AVATAR_MAX_SIZE } from "../../config/form";

import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

import theme from "../../styles/theme";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Avatar,
    Box,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import PropTypes from "prop-types";

const UserAvatarUpdateDialog = ({ reducer }) => {
    UserAvatarUpdateDialog.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const language = useSelector(selectUserLanguage);
    const userId = useSelector(selectUserId);
    const avatarUrl = useSelector(selectUserAvatarUrl);
    const showUserAvatarUpdateDialog = useSelector(
        selectShowUserAvatarUpdateDialog
    );
    const dispatch = useDispatch();

    const imgMimeTypes = {
        "image/jpg": "jpg",
        "image/jpeg": "jepg",
        "image/png": "png",
        "image/bmp": "bmp",
        "image/webp": "webp",
    };

    const extensionsArray = Object.values(imgMimeTypes);
    const extensionsString = extensionsArray
        .map(
            (extension, index) =>
                `${extension}${
                    index === extensionsArray.length - 1 ? "" : ", "
                }`
        )
        .join("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = () => {
        setErrorMessage("");
        dispatch(setShowUserAvatarUpdateDialog(false));
    };

    const handleChangeFile = async (e) => {
        setErrorMessage("");

        const uploadedFile = e.target.files[0];

        if (
            uploadedFile &&
            !Object.keys(imgMimeTypes).includes(uploadedFile.type)
        ) {
            setErrorMessage(`Formats acceptés : ${extensionsString}.`);
            return;
        } else if (uploadedFile?.size > 1024 * 1024) {
            setErrorMessage(
                `${theme.languages[language].components.userAvatarUpdateDialog.errors.size} ${AVATAR_MAX_SIZE} ${theme.languages[language].components.userAvatarUpdateDialog.unit}.`
            );
            return;
        } else {
            setIsLoading(true);

            try {
                // get ImgBB API key
                const imgBBAPIKeyResponse = await fetch(
                    `${API_BASE_URI}/API/config/imgbb-api-key`,
                    {
                        credentials: "include",
                    }
                );

                if (!imgBBAPIKeyResponse.ok) {
                    throw new Error(
                        theme.languages[
                            language
                        ].components.userAvatarUpdateDialog.errors.imgBBKey
                    );
                }
                const imgBBAPIKey = await imgBBAPIKeyResponse.json();

                // upload file to ImgBB
                const imgData = new FormData();
                imgData.append("image", uploadedFile);

                const uploadResponse = await fetch(
                    `${IMGBB_BASE_URI}/upload?key=${imgBBAPIKey}`,
                    {
                        method: "POST",
                        body: imgData, // binary file
                    }
                );

                if (!uploadResponse.ok) {
                    throw new Error(
                        theme.languages[
                            language
                        ].components.userAvatarUpdateDialog.errors.imgBBUpload
                    );
                }

                const avatar = await uploadResponse.json();
                const avatarUrl = avatar.data?.image?.url;

                // Update user avatar url in database
                const updateUserResponse = await fetch(
                    `${API_BASE_URI}/API/users/${userId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            avatarUrl,
                        }),
                        credentials: "include",
                    }
                );

                if (!updateUserResponse.ok) {
                    throw new Error(
                        theme.languages[
                            language
                        ].components.userAvatarUpdateDialog.errors.update
                    );
                }

                // Update user avatar url in global state
                dispatch(updateAvatar({ avatarUrl }));

                reducer.localDispatch({
                    type: reducer.ACTIONS.setShowUpdateValidation,
                    payload: "true",
                });
                handleClose();
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                setErrorMessage(
                    theme.languages[language].components.userAvatarUpdateDialog
                        .errors.global
                );
            }
        }
    };

    const handleDeleteImg = async () => {
        dispatch(updateAvatar({ avatarUrl: "" }));
        await fetch(`${API_BASE_URI}/API/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                avatarUrl: "",
            }),
            credentials: "include",
        });
        dispatch(setShowUserAvatarUpdateDialog(false));
    };

    return (
        <Dialog
            open={showUserAvatarUpdateDialog}
            onClose={handleClose}
            fullWidth>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <DialogTitle>
                    {
                        theme.languages[language].components
                            .userAvatarUpdateDialog.title
                    }
                </DialogTitle>
                <IconButton
                    onClick={handleClose}
                    sx={{ width: "2rem", height: "2rem", mr: "1rem" }}>
                    <Close />
                </IconButton>
            </Box>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                }}>
                <Box display="flex" alignItems="center">
                    <Avatar
                        imgProps={{
                            id: "avatar",
                            onLoad: () => setIsLoading(false),
                        }}
                        src={avatarUrl}
                        alt="Avatar"
                        sx={{
                            width: theme.maxWidth.profileAvatar,
                            height: theme.maxWidth.profileAvatar,
                        }}
                    />
                    {isLoading && (
                        <Box
                            sx={{
                                position: "absolute",
                                right: "0",
                                left: "0",
                                height: theme.maxWidth.profileAvatar,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "rgba(255, 255, 255, 0.5)",
                            }}>
                            <Loader modal hasMessage />
                        </Box>
                    )}
                </Box>

                {errorMessage && (
                    <Box mt="2rem">
                        <ErrorMessage errorMessage={errorMessage} />
                    </Box>
                )}
                <Box
                    mt="3rem"
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems="flex-start"
                    gap={{ xs: "2rem", sm: "1rem" }}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap=".2rem">
                        <Button component="label" variant="contained">
                            {
                                theme.languages[language].components
                                    .userAvatarUpdateDialog.choose
                            }
                            <input
                                hidden
                                type="file"
                                name="avatarInput"
                                onChange={handleChangeFile}
                            />
                        </Button>
                        <Typography variant="body2">
                            {`(${theme.languages[language].components.userAvatarUpdateDialog.maxSize} ${AVATAR_MAX_SIZE} ${theme.languages[language].components.userAvatarUpdateDialog.unit})`}
                        </Typography>
                    </Box>
                    <Button onClick={handleDeleteImg}>
                        {
                            theme.languages[language].components
                                .userAvatarUpdateDialog.remove
                        }
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UserAvatarUpdateDialog;
