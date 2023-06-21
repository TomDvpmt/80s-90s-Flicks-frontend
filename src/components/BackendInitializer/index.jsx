import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    setBackendIsInitialized,
    selectBackendIsInitialized,
} from "../../features/configSlice";

import { Outlet } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import { API_BASE_URI } from "../../config/APIs";

const BackendInitializer = () => {
    const dispatch = useDispatch();
    const backendIsInitialized = useSelector(selectBackendIsInitialized);

    // initializing the API in the background
    const { data, isLoading, error } = useFetch(
        `${API_BASE_URI}/API/config/initialize`
    );

    useEffect(() => {
        !isLoading && dispatch(setBackendIsInitialized(true));
    }, [isLoading]);

    return <Outlet />;
};

export default BackendInitializer;
