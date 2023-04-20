import React from "react";
import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

import ScrollToHashElement from "../ScrollToHashElement";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

import { userSetInfo } from "../../services/features/user";

const RouterWrapper = () => {
    const token = sessionStorage.getItem("token");
    const dispatch = useDispatch();
    const data = useLoaderData();

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
