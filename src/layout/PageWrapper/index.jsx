import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import ScrollToHashElement from "../ScrollToHashElement";
import Header from "../../layout/Header";
import NavBar from "../NavBar";
import PageHeading from "../../components/PageHeading";
import Footer from "../../layout/Footer";
import Loader from "../../components/Loader";

import { userSetInfo } from "../../features/user";

import { TMDB_API_KEY } from "../../utils/config";
import { tmdbSetConfig } from "../../features/tmdbConfig";

import { selectPageLocation, selectUserLanguage } from "../../app/selectors";

import { Box } from "@mui/material";

import theme from "../../assets/styles/theme";

const PageWrapper = () => {
    const token = sessionStorage.getItem("token");
    const page = useSelector(selectPageLocation());
    const language = useSelector(selectUserLanguage());
    const data = useLoaderData();
    const dispatch = useDispatch();

    const [heading, setHeading] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Set user's info in global state
    useEffect(() => {
        token
            ? dispatch(userSetInfo(data))
            : dispatch(
                  userSetInfo({
                      id: "",
                      username: "",
                      firstName: "",
                      lastName: "",
                      email: "",
                      moviesSeen: [""],
                      moviesToSee: [""],
                      favorites: [""],
                      language: "fr",
                  })
              );
    }, [token, data, dispatch]);

    // Get The Movie Database config infos
    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://api.themoviedb.org/3/configuration?api_key=${TMDB_API_KEY}`,
            { method: "GET" }
        )
            .then((response) => response.json())
            .then((data) => dispatch(tmdbSetConfig(data)))
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, [dispatch]);

    // Set page's heading
    useEffect(() => {
        language && setHeading(theme.languages[language].pages[page].h1);
    }, [language, page]);

    return isLoading ? (
        <Box
            component="main"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
            }}>
            <Loader />
        </Box>
    ) : (
        <Box>
            <ScrollRestoration />
            {/* <ScrollToHashElement /> */}
            <Header />
            <NavBar />
            <Box
                component="main"
                sx={{
                    flexGrow: "1",
                    maxWidth:
                        page === "movie" ? "initial" : theme.maxWidth.main,
                    m: "auto",
                    p: page === "movie" ? "0" : ".5rem .5rem 3rem .5rem",
                    bgcolor: page === "movie" && { md: "black" },
                    display: "flex",
                    flexDirection: "column",
                }}>
                {heading && page !== "movie" && <PageHeading text={heading} />}
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default PageWrapper;
