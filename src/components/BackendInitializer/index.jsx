import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setBackendIsInitialized } from "../../features/configSlice";

import useFetch from "../../hooks/useFetch";

import Loader from "../Loader";

import { API_BASE_URI } from "../../config/APIs";

import { Box, stepConnectorClasses } from "@mui/material";

const BackendInitializer = () => {
    const dispatch = useDispatch();

    console.log("BackendInitializer");

    const [isLoading, setIsLoading] = useState(true);

    // initializing the API in the background
    // const { data, isLoading } = useFetch(
    //     `${API_BASE_URI}/API/config/initialize`
    // );
    fetch(`${API_BASE_URI}/API/config/initialize`)
        .then((response) => response.json())
        .then(() => dispatch(setBackendIsInitialized(true)))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));

    // useEffect(() => {
    //     !isLoading && dispatch(setBackendIsInitialized(true));
    //     console.log(isLoading);
    // }, [isLoading]);

    return !isLoading && <Outlet />;
    // return isLoading ? (
    //     <Box
    //         flexGrow="1"
    //         display="flex"
    //         justifyContent="center"
    //         alignItems="center">
    //         <Loader />
    //     </Box>
    // ) : (
    //     <Outlet />
    // );
};

export default BackendInitializer;
