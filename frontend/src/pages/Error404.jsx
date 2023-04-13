import store from "../utils/store";
import { pageSetType } from "../features/page";

const Error404 = () => {
    store.dispatch(pageSetType("error404"));
    return <div>Error404</div>;
};

export default Error404;
