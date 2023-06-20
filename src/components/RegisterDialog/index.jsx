import { useDispatch, useSelector } from "react-redux";

import {
    setShowRegisterDialog,
    selectShowRegisterDialog,
} from "../../features/dialogsSlice";

import RegisterForm from "../RegisterForm";

import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const RegisterDialog = () => {
    const showRegisterDialog = useSelector(selectShowRegisterDialog);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setShowRegisterDialog(false));
    };

    return (
        <Dialog open={showRegisterDialog} onClose={handleClose} fullWidth>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                Connexion
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <RegisterForm location="dialog" />
            </DialogContent>
        </Dialog>
    );
};

export default RegisterDialog;
