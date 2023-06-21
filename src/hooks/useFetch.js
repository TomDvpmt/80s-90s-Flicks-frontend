import { useEffect, useState } from "react";

import PropTypes from "prop-types";

const useFetch = (
    url,
    method = "GET",
    dataType = "JSON",
    body = null,
    withCredentials = "omit"
) => {
    useFetch.propTypes = {
        url: PropTypes.string.isRequired,
        method: PropTypes.string,
        dataType: PropTypes.string,
        withCredentials: PropTypes.string,
    };

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(url, {
            method,
            headers: {
                "Content-type":
                    dataType === "JSON"
                        ? "application/json"
                        : "multipart/form-data",
            },
            body: dataType === "application/json" ? JSON.stringify(body) : body,
            credentials: withCredentials ? "include" : "omit",
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => setError(error))
            .finally(() =>
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000)
            );
    }, [url]);

    return { data, isLoading, error };
};

export default useFetch;
