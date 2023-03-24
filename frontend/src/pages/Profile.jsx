import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";

import fetchData from "../utils/fetchData";
import logout from "../utils/logout";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_API_URI}users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `BEARER ${token}`,
            },
        }).then((response) => {
            if (response.statusCode === 401) {
                logout(navigate);
            } else if (response.statusCode >= 400) {
                setErrorMessage("Unable to retrieve user data.");
            } else {
                setUserData(response);
            }
        });
    }, [userId, token, navigate]);

    return (
        <>
            <h1>My Profile</h1>
            <ul>
                <li>Username : {userData.username}</li>
                <li>First name: {userData.firstName}</li>
                <li>Last name: {userData.lastName}</li>
                <li>Email address: {userData.email}</li>
            </ul>
            <ErrorMessage errorMessage={errorMessage} />
        </>
    );
};

export default Profile;
