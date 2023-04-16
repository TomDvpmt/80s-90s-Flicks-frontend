import { Link, useNavigate } from "react-router-dom";

import Branding from "../components/Branding";

import { useSelector } from "react-redux";
import { selectUserIsSignedIn } from "../services/utils/selectors";

import logout from "../utils/logout";

import {
    Box,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Stack,
    Typography,
    Link as MUILink,
} from "@mui/material";

import theme from "../assets/styles/theme";

const cellStyle = {
    border: "none",
    color: "white",
    padding: ".5rem",
};

const leftCellStyle = {
    fontWeight: "700",
    textAlign: "right",
};

const Footer = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <Box
            sx={{
                backgroundColor: "var(--color-tertiary)",
            }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}>
                <Branding location="footer" />
                <Stack
                    component="nav"
                    spacing={1}
                    sx={{
                        "& *": {
                            color: theme.palette.primary.main,
                            fontWeight: "400",

                            "&:hover": {
                                textDecoration: "underline",
                            },
                        },
                    }}>
                    <Link to="/">Explorer</Link>
                    {isSignedIn && (
                        <>
                            <Link to="/dashboard">Mon tableau de bord</Link>
                            <Link to="/profile">Profil</Link>
                            <Typography
                                onClick={handleLogout}
                                variant="body2"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}>
                                Déconnexion
                            </Typography>
                        </>
                    )}
                    {!isSignedIn && (
                        <>
                            <Link to="/login">Se connecter</Link>
                            <Link to="/register">Créer un compte</Link>
                        </>
                    )}
                    <Link to="/about">Mentions légales</Link>
                </Stack>
            </Box>
            <Table
                sx={{
                    maxWidth: "max-content",
                    margin: "auto",
                    "& td": cellStyle,
                }}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ ...cellStyle, ...leftCellStyle }}>
                            Main API :{" "}
                        </TableCell>
                        <TableCell>
                            <MUILink
                                href="https://developers.themoviedb.org/3"
                                target="_blank"
                                rel="noopener"
                                underline="hover">
                                The Movie Database
                            </MUILink>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ ...cellStyle, ...leftCellStyle }}>
                            Source code :{" "}
                        </TableCell>
                        <TableCell>
                            <MUILink
                                href="https://github.com/TomDvpmt/80s-90s-Flix"
                                target="_blank"
                                rel="noopener"
                                underline="hover">
                                github.com/TomDvpmt/80s-90s-Flix
                            </MUILink>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};

export default Footer;
