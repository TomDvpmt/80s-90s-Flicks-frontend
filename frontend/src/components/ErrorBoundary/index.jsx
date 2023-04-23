import React from "react";
import {
    useRouteError,
    useLocation,
    Link as RouterLink,
} from "react-router-dom";

import { Box, Typography, Link } from "@mui/material";

import PropTypes from "prop-types";

const ErrorBoundary = ({ page }) => {
    ErrorBoundary.propTypes = {
        page: PropTypes.string,
    };

    let error = useRouteError();
    error !== undefined && console.error(error);

    const currentLocation = useLocation();

    let message;

    switch (page) {
        case "movie":
            message = "Aïe ! Impossible d'afficher les données du film.";
            break;
        case "dashboard":
            message = "Aïe ! Impossible d'afficher les données.";
            break;
        case "profile":
            message = "Aïe ! Impossible d'afficher les données du profil.";
            break;
        case "person":
            message = "Aïe ! Impossible d'afficher les données de la personne.";
            break;
        default:
            message = "Quelque chose s'est mal passé.";
    }

    return (
        <Box component="main">
            <Box component="section" padding="3rem">
                <Typography variant="h2" align="center" mb="2rem">
                    {message}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                    }}>
                    <Link
                        href={currentLocation}
                        underline="hover"
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}>
                        Rafraîchir la page
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/"
                        underline="hover"
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}>
                        Revenir à l'accueil
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default ErrorBoundary;
