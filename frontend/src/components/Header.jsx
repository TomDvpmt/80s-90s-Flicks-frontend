import { NavLink } from "react-router-dom";

import UserMenu from "./UserMenu";
import { Box, Container, Toolbar, Typography, Button } from "@mui/material";

import PropTypes from "prop-types";

const Header = ({ token, setToken }) => {
    Header.propTypes = {
        token: PropTypes.string,
        setToken: PropTypes.func,
    };

    return (
        <Box component="header">
            <Box component="div" className="test">
                <Container
                    component="p"
                    sx={{
                        mt: "8rem",
                        mb: "8rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Typography
                        variant="h1"
                        component="span"
                        fontFamily="Bungee Shade">
                        80s-90s
                    </Typography>
                    <Typography
                        variant="h1"
                        component="span"
                        fontFamily="Bungee Shade">
                        Flicks
                    </Typography>
                </Container>
            </Box>

            <Toolbar
                sx={{
                    backgroundColor: "var(--color-bttf-tertiary)",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                <Box>
                    <Button
                        component={NavLink}
                        to="/"
                        sx={{ color: "white", fontSize: "1.6rem" }}>
                        Explorer
                    </Button>
                    {token && (
                        <Button
                            component={NavLink}
                            to="/dashboard"
                            sx={{ color: "white", fontSize: "1.6rem" }}>
                            Mon tableau de bord
                        </Button>
                    )}
                    {!token && (
                        <>
                            <Button
                                component={NavLink}
                                to="/login"
                                sx={{ color: "white", fontSize: "1.6rem" }}>
                                Connexion
                            </Button>
                            <Button
                                component={NavLink}
                                to="/register"
                                sx={{ color: "white", fontSize: "1.6rem" }}>
                                Créer un compte
                            </Button>
                        </>
                    )}
                </Box>

                {token && <UserMenu token={token} setToken={setToken} />}
            </Toolbar>
        </Box>
    );
};

export default Header;
