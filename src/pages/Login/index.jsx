import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserToken } from "../../features/userSlice";

import LoginForm from "../../components/LoginForm";

const Login = () => {
    const token = useSelector(selectUserToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    return <LoginForm isDialogForm={false} />;
};

export default Login;
