import { useDispatch, useSelector } from "react-redux";

import {
    selectUserLanguage,
    setShowLoggedOnlyDialog,
    selectShowLoggedOnlyDialog,
    setShowLoginDialog,
    setShowRegisterDialog,
} from "../../../../features/user/userSlice";
import theme from "../../../../theme/theme";
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
    const language = useSelector(selectUserLanguage);
    const showLoggedOnlyDialog = useSelector(selectShowLoggedOnlyDialog);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setShowLoggedOnlyDialog(false));
    };

    const handleLogin = () => {
        handleClose();
        dispatch(setShowLoginDialog(true));
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
                    }}>
                    {
                        theme.languages[language].components.loggedOnlyDialog
                            .title
                    }
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {
                            theme.languages[language].components
                                .loggedOnlyDialog.description
                        }
                    </Typography>
                    <Typography>
                        <Typography component="span">
                            {
                                theme.languages[language].components
                                    .loggedOnlyDialog.redirect.question
                            }{" "}
                        </Typography>
                        <Link
                            onClick={handleRegister}
                            sx={{
                                color: theme.palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}>
                            {
                                theme.languages[language].components
                                    .loggedOnlyDialog.redirect.link
                            }
                        </Link>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        sx={{ color: theme.palette.text.darkBg }}>
                        {
                            theme.languages[language].components
                                .loggedOnlyDialog.confirm
                        }
                    </Button>
                    <Button onClick={handleClose}>
                        {
                            theme.languages[language].components
                                .loggedOnlyDialog.cancel
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LoggedOnlyDialog;
