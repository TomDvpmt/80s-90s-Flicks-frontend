import { useState, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectPageLocation } from "../../features/pageSlice";
import { setUserInfo, selectUserLanguage } from "../../features/userSlice";

import PageHeading from "../../components/PageHeading";

import theme from "../../styles/theme";
import { Box } from "@mui/material";

const Main = () => {
    const language = useSelector(selectUserLanguage);
    const page = useSelector(selectPageLocation);

    const userData = useLoaderData();
    const dispatch = useDispatch();

    const [heading, setHeading] = useState("");

    console.log("main");

    // Set user's info in global state
    useEffect(() => {
        dispatch(setUserInfo(userData));
    }, [userData, dispatch]);

    // Set page's heading
    useEffect(() => {
        language && setHeading(theme.languages[language].pages[page].h1);
    }, [language, page]);

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: "1",
                    width: "100%",
                    maxWidth:
                        page === "movie" ? "initial" : theme.maxWidth.main,
                    m: "auto",
                    p: page === "movie" ? "0" : ".5rem .5rem 3rem .5rem",
                    bgcolor: page === "movie" && { md: "black" },
                    display: "flex",
                    flexDirection: "column",
                }}>
                {/* {!token && <Box>Pas encore de compte ? Découvrez les avantages de l'inscription</Box>} */}
                {heading && page !== "movie" && <PageHeading text={heading} />}
                <Outlet />
            </Box>
        </>
    );
};

export default Main;
