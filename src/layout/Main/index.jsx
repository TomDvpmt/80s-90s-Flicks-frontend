import { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { API_BASE_URI, TMDB_BASE_URI, TMDB_API_KEY } from "../../config/APIs";

import { tmdbSetConfig } from "../../features/configSlice";
import { selectPageLocation } from "../../features/pageSlice";
import {
    auth,
    setUserInfo,
    selectUserLanguage,
} from "../../features/userSlice";

import NavBar from "../NavBar";
import PageHeading from "../../components/PageHeading";
import Loader from "../../components/Loader";

import theme from "../../styles/theme";
import { Box } from "@mui/material";

const Main = () => {
    const language = useSelector(selectUserLanguage);
    const page = useSelector(selectPageLocation);

    const dispatch = useDispatch();

    const [heading, setHeading] = useState("");
    const [isLoading, setIsloading] = useState(true);

    const setTmdbConfig = useCallback(() => {
        fetch(`${TMDB_BASE_URI}/configuration?api_key=${TMDB_API_KEY}`)
            .then((response) => response.json())
            .then((data) => dispatch(tmdbSetConfig(data)))
            .catch((error) => console.error(error));
    }, [dispatch]);

    const getToken = useCallback(async () => {
        try {
            const tokenResponse = await fetch(
                `${API_BASE_URI}/API/users/token`,
                {
                    credentials: "include",
                }
            );
            if (!tokenResponse.ok) {
                throw new Error("Aucun token d'accès trouvé.");
            }
            const token = await tokenResponse.json();

            return token;
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    const getUserInfo = useCallback(async () => {
        try {
            const profileResponse = await fetch(
                `${API_BASE_URI}/API/users/profile`,
                {
                    credentials: "include",
                }
            );
            if (!profileResponse.ok) {
                return {};
            }
            const data = await profileResponse.json();
            return data;
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    useEffect(() => {
        setIsloading(true);
        setTmdbConfig();
        getToken()
            .then((token) => {
                if (token) {
                    dispatch(auth(token));
                    getUserInfo().then((data) => {
                        dispatch(setUserInfo(data));
                    });
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setIsloading(false);
            });
    }, [dispatch, setTmdbConfig]);

    // Set page's heading
    useEffect(() => {
        language && setHeading(theme.languages[language].pages[page].h1);
    }, [language, page]);

    return isLoading ? (
        <Box
            component="main"
            flexGrow="1"
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Loader hasMessage />
        </Box>
    ) : (
        <>
            <NavBar />
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
