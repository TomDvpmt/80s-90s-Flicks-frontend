import { useDispatch, useSelector } from "react-redux";

import {
    setShowLoggedOnlyDialog,
    selectShowLoggedOnlyDialog,
    setShowLoginDialog,
    setShowRegisterDialog,
} from "../../features/dialogsSlice";

import LoginDialog from "../LoginDialog";
import RegisterDialog from "../RegisterDialog";

import theme from "../../styles/theme";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
    Link,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const LoggedOnlyDialog = () => {
    const showLoggedOnlyDialog = useSelector(selectShowLoggedOnlyDialog);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setShowLoggedOnlyDialog(false));
    };

    const handleLogin = () => {
        dispatch(setShowLoginDialog(true));
        handleClose();
    };

    const handleRegister = () => {
        dispatch(setShowRegisterDialog(true));
        handleClose();
    };

    return (
        <>
            <Dialog open={showLoggedOnlyDialog} onClose={handleClose} fullWidth>
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // lineHeight: "1.4rem",
                    }}>
                    Fonctionnalité réservée aux membres
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Cette fonctionnalité est réservée aux utilisateurs
                        connectés.
                    </Typography>
                    <Typography>
                        <Typography component="span">
                            Pas encore inscrit ?{" "}
                        </Typography>
                        <Link
                            onClick={handleRegister}
                            sx={{
                                color: theme.palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}>
                            Créer un compte
                        </Link>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        sx={{ color: theme.palette.text.darkBg }}>
                        Se connecter
                    </Button>
                    <Button onClick={handleClose}>Annuler</Button>
                </DialogActions>
            </Dialog>
            <LoginDialog />
            <RegisterDialog />
        </>
    );
};

export default LoggedOnlyDialog;
