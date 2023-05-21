import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserIsSignedIn, selectUserLanguage } from "../../app/selectors";

import Branding from "../../components/Branding";
import FooterExternalLink from "../../components/FooterExternalLink";

import { logout } from "../../utils/user";

import {
    Box,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Stack,
    Link as MUILink,
} from "@mui/material";

import theme from "../../assets/styles/theme";

const cellStyle = {
    border: "none",
    padding: ".2rem .5rem",
    color: theme.palette.text.darkBg,
    fontSize: ".8rem",
};

const leftCellStyle = {
    fontWeight: "700",
    textAlign: "right",
};

const Footer = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const language = useSelector(selectUserLanguage());
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout(navigate);
    };

    return (
        <Box component="footer" bgcolor={theme.palette.background.darkest}>
            <Box
                sx={{
                    maxWidth: theme.maxWidth.main,
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column-reverse",
                }}>
                <Branding location="footer" />
                <Stack
                    component="nav"
                    spacing={1}
                    sx={{
                        padding: "2rem",
                        "& *": {
                            color: theme.palette.text.darkBg,
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
                            <Link to="/login" onClick={handleLogout}>
                                Déconnexion
                            </Link>
                        </>
                    )}
                    {!isSignedIn && (
                        <>
                            <Link to="/login">Se connecter</Link>
                            <Link to="/register">Créer un compte</Link>
                        </>
                    )}
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
                            API externes utilisées :{" "}
                        </TableCell>
                        <TableCell>
                            <FooterExternalLink type="tmdbAPI" />
                            {", "}
                            <FooterExternalLink type="mediaWikiAPI" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ ...cellStyle, ...leftCellStyle }}>
                            Code source :{" "}
                        </TableCell>
                        <TableCell>
                            <FooterExternalLink type="sourceCode" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};

export default Footer;
