import { useEffect } from "react";

import { setUserInfo } from "../utils/requests";

const Error404 = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);
    return <div>Error404</div>;
};

export default Error404;
