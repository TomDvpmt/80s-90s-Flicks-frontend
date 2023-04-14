import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import ErrorMessage from "../components/ErrorMessage";
import UserForm from "../components/forms/UserForm";

import { setUserInfo } from "../utils/requests";

import { selectUserInfo } from "../utils/selectors";

const Profile = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");

    const user = useSelector(selectUserInfo());

    const handleUpdateUser = () => {
        setShowUpdateForm((showUpdateForm) => !showUpdateForm);
    };

    return (
        <main>
            <h1>My Profile</h1>
            <ul>
                <li>Username : {user.username}</li>
                <li>First name: {user.firstName}</li>
                <li>Last name: {user.lastName}</li>
                <li>Email address: {user.email}</li>
            </ul>
            {/* <ErrorMessage errorMessage={errorMessage} /> */}
            <button type="button" onClick={handleUpdateUser}>
                Modifier les informations
            </button>

            {showUpdateForm && (
                <UserForm
                    page="profile"
                    userId={user.id}
                    defaultFormValues={{
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    }}
                    setShowUpdateForm={setShowUpdateForm}
                />
            )}
        </main>
    );
};

export default Profile;
