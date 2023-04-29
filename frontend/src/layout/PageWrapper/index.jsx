import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import ScrollToHashElement from "../ScrollToHashElement";
import Header from "../../layout/Header";
import NavBar from "../NavBar";
import PageHeading from "../../components/PageHeading";
import Footer from "../../layout/Footer";

import { userSetInfo } from "../../services/features/user";

import {
    selectPageLocation,
    selectUserLanguage,
} from "../../services/utils/selectors";

import { Box } from "@mui/material";

import theme from "../../assets/styles/theme";

const PageWrapper = () => {
    const token = sessionStorage.getItem("token");
    const page = useSelector(selectPageLocation());
    const language = useSelector(selectUserLanguage());
    const data = useLoaderData();
    const dispatch = useDispatch();

    const [heading, setHeading] = useState("");

    useEffect(() => {
        page === "movie" || page === "person"
            ? setHeading("")
            : language && setHeading(theme.languages[language].pages[page].h1);
    }, [language, page]);

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

    return (
        <>
            <ScrollRestoration />
            {/* <ScrollToHashElement /> */}
            <Header />
            <NavBar />
            <Box component="main" maxWidth={theme.maxWidth.main} margin="auto">
                {heading !== "" && <PageHeading text={heading} />}
                <Outlet />
            </Box>
            <Footer />
        </>
    );
};

export default PageWrapper;
