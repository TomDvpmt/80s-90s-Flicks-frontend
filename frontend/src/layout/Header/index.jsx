// import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Branding from "../../components/Branding";
import UserMenu from "../../components/UserMenu";

// import ErrorBoundary from "../../components/ErrorBoundary";

// import { userSetInfo } from "../../services/features/user";
import {
    selectUserIsSignedIn,
    selectUserUsername,
} from "../../services/utils/selectors";

import { Box, Toolbar, Button, Typography } from "@mui/material";
import theme from "../../assets/styles/theme";

const Header = () => {
    // const token = sessionStorage.getItem("token");
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const username = useSelector(selectUserUsername());
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const setUserInfo = async (token) => {
    //         if (token) {
    //             try {
    //                 const response = await fetch(`/API/users/0`, {
    //                     method: "GET",
    //                     headers: {
    //                         Authorization: `BEARER ${token}`,
    //                     },
    //                 });
    //                 const data = await response.json();
    //                 dispatch(userSetInfo(data));
    //             } catch (error) {
    //                 console.log(error); // HANDLE ERROR
    //             }
    //         } else {
    //             dispatch(
    //                 userSetInfo({
    //                     id: "",
    //                     username: "",
    //                     firstName: "",
    //                     lastName: "",
    //                     email: "",
    //                     moviesSeen: [""],
    //                     moviesToSee: [""],
    //                     language: "fr",
    //                 })
    //             );
    //         }
    //     };
    //     setUserInfo(token);
    //     // to add : handle request error
    // }, [token]);

    return (
        <Box component="header" bgcolor={theme.palette.secondary.light}>
            <Branding location="header" />
            <Toolbar
                sx={{
                    backgroundColor: theme.palette.primary.light,
                    justifyContent: "center",
                }}>
                <Box
                    component="nav"
                    sx={{
                        flex: 1,
                        maxWidth: theme.maxWidth.nav,
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
                        {isSignedIn && (
                            <Button
                                component={NavLink}
                                to="/dashboard"
                                sx={{ color: "white" }}>
                                Mon tableau de bord
                            </Button>
                        )}
                        {!isSignedIn && (
                            <>
                                <Button
                                    component={NavLink}
                                    to="/login"
                                    sx={{ color: "white" }}>
                                    Se connecter
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

                    {isSignedIn && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography component="span" color="white">
                                {username}
                            </Typography>
                            <UserMenu />
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </Box>
    );
};

export default Header;
