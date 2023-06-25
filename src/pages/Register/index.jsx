import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectToken } from "../../features/user/userSlice";

import RegisterForm from "../../features/user/components/RegisterForm";

const Register = () => {
    const token = useSelector(selectToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [navigate, token]);

    return <RegisterForm isDialogForm={false} />;
};

export default Register;
