import { Link as RouterLink } from "react-router-dom";

import theme from "../../styles/theme";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    IconButton,
    Typography,
    Link,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import PropTypes from "prop-types";

const LoggedOnlyDialog = ({ reducer }) => {
    LoggedOnlyDialog.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const handleClose = () => {
        reducer.localDispatch({
            type: reducer.ACTIONS.setShowLoggedOnlyDialog,
            payload: false,
        });
    };

    return (
        <Dialog
            open={reducer.state.showLoggedOnlyDialog}
            onClose={handleClose}
            fullWidth>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                Fonctionnalité réservée aux membres
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography>
                        Cette fonctionnalité est réservée aux utilisateurs
                        connectés.
                    </Typography>
                    <Typography>
                        <Typography component="span">
                            Pas encore inscrit ?{" "}
                        </Typography>
                        <Link
                            component={RouterLink}
                            to="/register"
                            sx={{ color: theme.palette.primary.main }}>
                            Créer un compte
                        </Link>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    component={RouterLink}
                    variant="contained"
                    to="/login"
                    onClick={handleClose}
                    sx={{ color: theme.palette.text.darkBg }}>
                    Se connecter
                </Button>
                <Button onClick={handleClose}>Annuler</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoggedOnlyDialog;
