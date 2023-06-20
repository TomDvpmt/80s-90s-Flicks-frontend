import { useDispatch, useSelector } from "react-redux";
import {
    setShowLoginDialog,
    selectShowLoginDialog,
} from "../../features/dialogsSlice";

import LoginForm from "../LoginForm";

import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const LoginDialog = () => {
    const dispatch = useDispatch();
    const showLoginDialog = useSelector(selectShowLoginDialog);

    const handleClose = () => {
        dispatch(setShowLoginDialog(false));
    };

    return (
        <Dialog open={showLoginDialog} onClose={handleClose} fullWidth>
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
                <LoginForm isDialogForm={true} />
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
