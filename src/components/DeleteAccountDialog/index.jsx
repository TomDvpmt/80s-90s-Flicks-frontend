import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserId } from "../../features/userSlice";

import { logout } from "../../utils/user";
import { BASE_API_URI } from "../../utils/config";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

import PropTypes from "prop-types";

const DeleteAccountDialog = ({
    showDeleteDialog,
    setShowDeleteDialog,
    setErrorMessage,
}) => {
    DeleteAccountDialog.propTypes = {
        showDeleteDialog: PropTypes.bool.isRequired,
        setShowDeleteDialog: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
    };

    const navigate = useNavigate();
    const userId = useSelector(selectUserId);

    const handleYes = async () => {
        const response = await fetch(`${BASE_API_URI}/API/users/${userId}`, {
            method: "DELETE",
            credentials: "include",
        });
        const data = await response.json();
        if (data.statusCode >= 400) {
            setErrorMessage(data.message);
            return;
        }
        logout(navigate);
    };

    const handleNo = () => {
        setShowDeleteDialog(false);
    };

    return (
        <Dialog open={showDeleteDialog}>
            <DialogTitle>
                Êtes-vous sûr de vouloir supprimer votre compte ?
            </DialogTitle>
            <DialogContent>
                Toues les informations qui y sont attachées seront supprimées.
                Cette opération est irréversible.
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="warning" onClick={handleYes}>
                    Supprimer le compte
                </Button>
                <Button onClick={handleNo}>Annuler</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAccountDialog;
