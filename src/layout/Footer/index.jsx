import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserToken, selectUserLanguage } from "../../features/userSlice";

import Branding from "../../components/Branding";
import FooterExternalLink from "../../components/FooterExternalLink";

import { logout } from "../../utils/user";

import { Box, Table, TableBody, TableRow, TableCell } from "@mui/material";

import theme from "../../styles/theme";

const cellStyle = {
    border: "none",
    padding: ".2rem .5rem",
    color: theme.palette.text.darkBg,
    fontSize: ".8rem",
    fontFamily: "Raleway, Arial",
};

const leftCellStyle = {
    fontWeight: "700",
    textAlign: "right",
};

const Footer = () => {
    const language = useSelector(selectUserLanguage);
    const token = useSelector(selectUserToken);
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
                <Box
                    component="nav"
                    width="max-content"
                    padding="2rem"
                    display="flex"
                    flexDirection="column"
                    gap=".5rem"
                    sx={{
                        "& *": {
                            color: theme.palette.text.darkBg,
                            fontWeight: "400",
                            fontFamily: "Raleway, Arial",

                            "&:hover": {
                                textDecoration: "underline",
                            },
                        },
                    }}>
                    <Link to="/">
                        {theme.languages[language].navigation.explore}
                    </Link>
                    {token && (
                        <>
                            <Link to="/dashboard">
                                {theme.languages[language].navigation.dashboard}
                            </Link>
                            <Link to="/profile">
                                {theme.languages[language].navigation.profile}
                            </Link>
                            <Link to="/login" onClick={handleLogout}>
                                {theme.languages[language].navigation.logout}
                            </Link>
                        </>
                    )}
                    {!token && (
                        <>
                            <Link to="/login">
                                {theme.languages[language].navigation.login}
                            </Link>
                            <Link to="/register">
                                {theme.languages[language].navigation.register}
                            </Link>
                        </>
                    )}
                </Box>
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
                            {theme.languages[language].layout.footer.usedAPI}{" "}
                        </TableCell>
                        <TableCell>
                            <FooterExternalLink type="tmdbAPI" />
                            {", "}
                            <FooterExternalLink type="mediaWikiAPI" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ ...cellStyle, ...leftCellStyle }}>
                            {theme.languages[language].layout.footer.sourceCode}{" "}
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
