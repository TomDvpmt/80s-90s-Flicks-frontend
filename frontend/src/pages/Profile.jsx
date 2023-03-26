import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";

import UserForm from "../components/forms/UserForm";

import fetchData from "../utils/fetchData";
import logout from "../utils/logout";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleUpdateUser = () => {
        setShowUpdateForm((showUpdateForm) => !showUpdateForm);
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

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
    }, [navigate]);

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
            <button type="button" onClick={handleUpdateUser}>
                Modifier les informations
            </button>

            {showUpdateForm && (
                <UserForm
                    userId={userData.id}
                    page="profile"
                    defaultFormValues={{
                        username: userData.username,
                        email: userData.email,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                    }}
                    setShowUpdateForm={setShowUpdateForm}
                    setUserData={setUserData}
                />
            )}
        </>
    );
};

export default Profile;
