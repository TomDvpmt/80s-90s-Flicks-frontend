import store from "../utils/store";
import { userSignOut } from "../features/user";

const logout = (navigate) => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    store.dispatch(userSignOut());
    navigate("/login");
};

export default logout;
