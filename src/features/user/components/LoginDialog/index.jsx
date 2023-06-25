import { useDispatch, useSelector } from "react-redux";
import {
    setShowLoginDialog,
    selectShowLoginDialog,
    selectUserLanguage,
} from "../../../../features/user/userSlice";

import LoginForm from "../LoginForm";

import theme from "../../../../theme/theme";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const LoginDialog = () => {
    const language = useSelector(selectUserLanguage);
    const showLoginDialog = useSelector(selectShowLoginDialog);
    const dispatch = useDispatch();

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
                {theme.languages[language].components.loginDialog.title}
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
