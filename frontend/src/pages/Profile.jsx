import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
import UserForm from "../components/forms/UserForm";

import { fetchData } from "../utils/requests";
import logout from "../utils/logout";

import store from "../utils/store";
import { pageSetType } from "../features/page";

const Profile = () => {
    useEffect(() => {
        store.dispatch(pageSetType("profile"));
    }, []);

    const [userData, setUserData] = useState({});
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleUpdateUser = () => {
        setShowUpdateForm((showUpdateForm) => !showUpdateForm);
    };

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("token");

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
        <main>
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
        </main>
    );
};

export default Profile;
