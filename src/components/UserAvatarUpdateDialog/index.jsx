import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { userUpdateAvatar } from "../../features/user";
import { selectUserAvatarUrl, selectUserId } from "../../app/selectors";

import { BASE_API_URI, BASE_IMGBB_URI } from "../../utils/config";

import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

import theme from "../../assets/styles/theme";
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

const UserAvatarUpdateDialog = ({
    showUserAvatarUpdateDialog,
    setShowUserAvatarUpdateDialog,
}) => {
    UserAvatarUpdateDialog.propTypes = {
        showUserAvatarUpdateDialog: PropTypes.bool.isRequired,
        setShowUserAvatarUpdateDialog: PropTypes.func.isRequired,
    };

    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId());
    const avatarUrl = useSelector(selectUserAvatarUrl());
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

    const handleChangeFile = async (e) => {
        setErrorMessage("");

        const uploadedFile = e.target.files[0];

        if (
            uploadedFile &&
            !Object.keys(imgMimeTypes).includes(uploadedFile.type)
        ) {
            setErrorMessage(`Formats acceptés : ${extensionsString}.`);
            return;
        } else if (uploadedFile.size > 1024 * 1024) {
            setErrorMessage("La taille du fichier ne doit pas dépasser 1Mo.");
            return;
        } else {
            setIsLoading(true);
            fetch(`${BASE_API_URI}/API/config/imgbb-api-key`, {
                headers: {
                    Authorization: `BEARER ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    const imgBBAPIKey = data;

                    const imgData = new FormData();
                    imgData.append("image", uploadedFile);

                    const uploadImage = async () => {
                        const uploadResponse = await fetch(
                            `${BASE_IMGBB_URI}/upload?key=${imgBBAPIKey}`,
                            {
                                method: "POST",
                                body: imgData, // binary file
                            }
                        );
                        const avatar = await uploadResponse.json();
                        const avatarUrl = avatar.data?.image?.url;

                        await fetch(`${BASE_API_URI}/API/users/${userId}`, {
                            method: "PUT",
                            headers: {
                                Authorization: `BEARER ${token}`,
                                "Content-type": "application/json",
                            },
                            body: JSON.stringify({
                                avatarUrl,
                            }),
                        });

                        dispatch(userUpdateAvatar({ avatarUrl }));
                    };

                    uploadImage();
                })
                .catch((error) => console.log(error));
        }
    };

    const handleDeleteImg = async () => {
        dispatch(userUpdateAvatar({ avatarUrl: "" }));
        await fetch(`${BASE_API_URI}/API/users/${userId}`, {
            method: "PUT",
            headers: {
                Authorization: `BEARER ${token}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                avatarUrl: "",
            }),
        });
        setShowUserAvatarUpdateDialog(false);
    };

    const handleClose = () => {
        setShowUserAvatarUpdateDialog(false);
        setErrorMessage("");
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
                <DialogTitle>Votre avatar</DialogTitle>
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
                                display: "flex",
                                width: theme.maxWidth.profileAvatar,
                                height: theme.maxWidth.profileAvatar,
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "rgba(255, 255, 255, 0.5)",
                            }}>
                            <Loader />
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
                            Choisir une image
                            <input
                                hidden
                                type="file"
                                name="avatarInput"
                                onChange={handleChangeFile}
                            />
                        </Button>
                        <Typography variant="body2">
                            {"(taille maximale: 1 Mo)"}
                        </Typography>
                    </Box>
                    <Button onClick={handleDeleteImg}>Supprimer l'image</Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UserAvatarUpdateDialog;
