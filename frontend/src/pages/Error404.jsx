import { useEffect } from "react";

import store from "../utils/store";
import { pageSetType } from "../features/page";

const Error404 = () => {
    useEffect(() => {
        store.dispatch(pageSetType("error404"));
    }, []);
    return <div>Error404</div>;
};

export default Error404;
