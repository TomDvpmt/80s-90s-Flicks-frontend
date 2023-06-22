import React from "react";
import {
    useRouteError,
    useLocation,
    useNavigate,
    Link as RouterLink,
} from "react-router-dom";

import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

import { logout } from "../../utils/user";

import { Box, Typography, Link } from "@mui/material";

import PropTypes from "prop-types";
import theme from "../../styles/theme";

const ErrorBoundary = ({ page }) => {
    ErrorBoundary.propTypes = {
        page: PropTypes.string,
    };

    const navigate = useNavigate();

    let error = useRouteError();
    error !== undefined && console.error(error);

    const currentLocation = useLocation().pathname;

    let message;

    switch (page) {
        case "all":
            message = "Quelque chose s'est mal passé.";
            break;
        case "home":
            message = "Aïe ! Impossible d'afficher les films.";
            break;
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

    const handleLogout = () => {
        logout(navigate);
        window.location.reload();
    };

    return (
        <>
            {page === "all" && <Header />}
            <Box
                component="main"
                flexGrow="1"
                bgcolor={theme.palette.background.default}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center">
                <Box component="section" padding="3rem">
                    <Typography
                        variant="h2"
                        align="center"
                        mb="2rem"
                        textTransform="none">
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
                                color: theme.palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}>
                            Essayer de rafraîchir la page
                        </Link>
                        {page === "all" ? (
                            <Link
                                onClick={handleLogout}
                                sx={{
                                    color: theme.palette.primary.main,
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}>
                                Revenir à l'accueil
                            </Link>
                        ) : (
                            page !== "home" && (
                                <Link
                                    component={RouterLink}
                                    to="/"
                                    underline="hover"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        "&:hover": {
                                            cursor: "pointer",
                                        },
                                    }}>
                                    Revenir à l'accueil
                                </Link>
                            )
                        )}
                    </Box>
                </Box>
            </Box>
            {page === "all" && <Footer />}
        </>
    );
};

export default ErrorBoundary;
