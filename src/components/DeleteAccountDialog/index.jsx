import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectDemoUserId } from "../../features/configSlice";
import { selectUserId, selectUserLanguage } from "../../features/userSlice";
import {
    setShowDeleteAccountDialog,
    selectShowDeleteAccountDialog,
} from "../../features/dialogsSlice";

import ErrorMessage from "../ErrorMessage";

import { logout } from "../../utils/user";
import { API_BASE_URI } from "../../config/APIs";

import theme from "../../styles/theme";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from "@mui/material";

const DeleteAccountDialog = () => {
    const userId = useSelector(selectUserId);
    const language = useSelector(selectUserLanguage);
    const showDeleteAccountDialog = useSelector(selectShowDeleteAccountDialog);
    const demoUserId = useSelector(selectDemoUserId);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState("");

    const handleConfirmDelete = async () => {
        try {
            // Prevent deletion of DemoUser account
            if (!demoUserId) {
                throw new Error(
                    theme.languages[
                        language
                    ].components.deleteAccountDialog.errors.impossible
                );
            }
            if (demoUserId === userId) {
                throw new Error(
                    theme.languages[
                        language
                    ].components.deleteAccountDialog.errors.forbidden
                );
            }

            // Delete account
            const response = await fetch(
                `${API_BASE_URI}/API/users/${userId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            dispatch(setShowDeleteAccountDialog(false));
            logout(navigate);
        } catch (error) {
            setErrorMessage(error.message);
            console.error(error);
        }
    };

    const handleClose = () => {
        dispatch(setShowDeleteAccountDialog(false));
        setErrorMessage("");
    };

    return (
        <Dialog open={showDeleteAccountDialog}>
            <DialogTitle>
                {theme.languages[language].components.deleteAccountDialog.title}
            </DialogTitle>
            <DialogContent>
                {
                    theme.languages[language].components.deleteAccountDialog
                        .description
                }
                {errorMessage && (
                    <Box m="2rem 0">
                        <ErrorMessage errorMessage={errorMessage} />
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={handleConfirmDelete}>
                    {
                        theme.languages[language].components.deleteAccountDialog
                            .confirm
                    }
                </Button>
                <Button onClick={handleClose}>
                    {
                        theme.languages[language].components.deleteAccountDialog
                            .cancel
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAccountDialog;
