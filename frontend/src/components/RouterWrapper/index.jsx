import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import ScrollToHashElement from "../ScrollToHashElement";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

const RouterWrapper = () => {
    return (
        <>
            <ScrollToHashElement />
            {/* <ScrollRestoration /> */}
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default RouterWrapper;
