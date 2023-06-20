import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectUserId } from "../../features/userSlice";
import {
    setShowDeleteAccountDialog,
    selectShowDeleteAccountDialog,
} from "../../features/dialogsSlice";

import ErrorMessage from "../ErrorMessage";

import { logout } from "../../utils/user";
import { API_BASE_URI } from "../../config/APIs";

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
    const showDeleteAccountDialog = useSelector(selectShowDeleteAccountDialog);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState("");

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URI}/API/users/${userId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setErrorMessage(data.message);
                throw new Error(data.message);
            }
            dispatch(setShowDeleteAccountDialog(false));
        } catch (error) {
            console.log(error);
        }
        logout(navigate);
    };

    const handleClose = () => {
        dispatch(setShowDeleteAccountDialog(false));
        setErrorMessage("");
    };

    return (
        <Dialog open={showDeleteAccountDialog}>
            <DialogTitle>
                Êtes-vous sûr de vouloir supprimer votre compte ?
            </DialogTitle>
            <DialogContent>
                Toues les informations qui y sont attachées seront supprimées.
                Cette opération est irréversible.
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
                    Supprimer le compte
                </Button>
                <Button onClick={handleClose}>Annuler</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAccountDialog;
