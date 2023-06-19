import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserId } from "../../features/userSlice";

import ErrorMessage from "../ErrorMessage";

import { logout } from "../../utils/user";
import { API_BASE_URI } from "../../utils/config";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from "@mui/material";

import PropTypes from "prop-types";

const DeleteAccountDialog = ({ reducer }) => {
    DeleteAccountDialog.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const navigate = useNavigate();
    const userId = useSelector(selectUserId);

    const [errorMessage, setErrorMessage] = useState("");

    const handleYes = async () => {
        const response = await fetch(`${API_BASE_URI}/API/users/${userId}`, {
            method: "DELETE",
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            setErrorMessage(data.message);
            return;
        }
        logout(navigate);
    };

    const handleClose = () => {
        reducer.localDispatch({
            type: reducer.ACTIONS.setShowDeleteDialog,
            payload: false,
        });
        setErrorMessage("");
    };

    return (
        <Dialog open={reducer.state.showDeleteDialog}>
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
                <Button variant="contained" color="warning" onClick={handleYes}>
                    Supprimer le compte
                </Button>
                <Button onClick={handleClose}>Annuler</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAccountDialog;
