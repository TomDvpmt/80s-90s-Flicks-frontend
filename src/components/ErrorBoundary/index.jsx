import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../features/userSlice";

import {
    useRouteError,
    useLocation,
    useNavigate,
    Link as RouterLink,
} from "react-router-dom";

import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

import { logout } from "../../utils/user";

import theme from "../../styles/theme";
import { Box, Typography, Link } from "@mui/material";

import PropTypes from "prop-types";

const ErrorBoundary = ({ page }) => {
    ErrorBoundary.propTypes = {
        page: PropTypes.string,
    };

    const language = useSelector(selectUserLanguage);
    const navigate = useNavigate();

    let error = useRouteError();
    error !== undefined && console.error(error);

    const currentLocation = useLocation().pathname;

    let message;

    switch (page) {
        case "all":
            message =
                theme.languages[language].components.errorBoundary.pages.all;
            break;
        case "home":
            message =
                theme.languages[language].components.errorBoundary.pages.home;
            break;
        case "movie":
            message =
                theme.languages[language].components.errorBoundary.pages.movie;
            break;
        case "dashboard":
            message =
                theme.languages[language].components.errorBoundary.pages
                    .dashboard;
            break;
        case "profile":
            message =
                theme.languages[language].components.errorBoundary.pages
                    .profile;
            break;
        case "person":
            message =
                theme.languages[language].components.errorBoundary.pages.person;
            break;
        default:
            message =
                theme.languages[language].components.errorBoundary.pages
                    .default;
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
                            {
                                theme.languages[language].components
                                    .errorBoundary.refreshLink
                            }
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
                                {
                                    theme.languages[language].components
                                        .errorBoundary.refreshLink
                                }
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
                                    {
                                        theme.languages[language].components
                                            .errorBoundary.backHomeLink
                                    }
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
