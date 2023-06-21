import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "../../layout/Header";
import NavBar from "../NavBar";
import Footer from "../../layout/Footer";

import { Box } from "@mui/material";

const PageWrapper = () => {
    console.log("PageWrapper");
    return (
        <Box id="page-wrapper" flex="1" display="flex" flexDirection="column">
            <ScrollRestoration
                getKey={(location, matches) => {
                    return location.pathname;
                }}
            />
            <Header />
            <NavBar />
            <Outlet />
            <Footer />
        </Box>
    );
};

export default PageWrapper;
