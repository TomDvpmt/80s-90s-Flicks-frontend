import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectToken } from "../../features/user/userSlice";

import LoginForm from "../../features/user/components/LoginForm";

const Login = () => {
    const token = useSelector(selectToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    return <LoginForm isDialogForm={false} />;
};

export default Login;
