import React, { useEffect } from "react";
import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

import ScrollToHashElement from "../ScrollToHashElement";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

import { userSetInfo } from "../../services/features/user";

const RouterWrapper = () => {
    const token = sessionStorage.getItem("token");
    const data = useLoaderData();
    const dispatch = useDispatch();

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
                      language: "fr",
                  })
              );
    }, [token, data]);

    return (
        <>
            <ScrollRestoration />
            <ScrollToHashElement />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default RouterWrapper;
