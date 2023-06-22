import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

const BackendInitializer = () => {
    const dispatch = useDispatch();

    return <Outlet />;
};

export default BackendInitializer;
