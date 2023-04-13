import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import Branding from "./Branding";
import UserMenu from "./UserMenu";
import { Box, Toolbar, Button } from "@mui/material";

import { theme } from "../utils/theme";

import PropTypes from "prop-types";

const Header = ({ token, setToken }) => {
    Header.propTypes = {
        token: PropTypes.string,
        setToken: PropTypes.func,
    };

    useEffect(() => {
        if (!token) {
            setToken(localStorage.getItem("token"));
        }
    }, [token, setToken]);

    return (
        <Box component="header">
            <Branding location="header" />
            <Toolbar
                sx={{
                    backgroundColor: theme.palette.tertiary.main,
                    justifyContent: "center",
                }}>
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: theme.maxWidth.desktop,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <Box>
                        <Button
                            component={NavLink}
                            to="/"
                            sx={{ color: "white" }}>
                            Explorer
                        </Button>
                        {token && (
                            <Button
                                component={NavLink}
                                to="/dashboard"
                                sx={{ color: "white" }}>
                                Mon tableau de bord
                            </Button>
                        )}
                        {!token && (
                            <>
                                <Button
                                    component={NavLink}
                                    to="/login"
                                    sx={{ color: "white" }}>
                                    Connexion
                                </Button>
                                <Button
                                    component={NavLink}
                                    to="/register"
                                    sx={{ color: "white" }}>
                                    Créer un compte
                                </Button>
                            </>
                        )}
                    </Box>
                    {token && <UserMenu token={token} setToken={setToken} />}
                </Box>
            </Toolbar>
        </Box>
    );
};

export default Header;
