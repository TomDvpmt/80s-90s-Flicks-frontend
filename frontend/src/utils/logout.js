import store from "../services/utils/store";
import { userSignOut } from "../services/features/user";

const logout = (navigate) => {
    sessionStorage.removeItem("token");
    store.dispatch(userSignOut());
    navigate("/login");
};

export default logout;
