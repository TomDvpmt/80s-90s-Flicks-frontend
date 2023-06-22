import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserToken } from "../../features/userSlice";

import RegisterForm from "../../components/RegisterForm";

const Register = () => {
    const token = useSelector(selectUserToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [navigate, token]);

    return <RegisterForm isDialogForm={false} />;
};

export default Register;
