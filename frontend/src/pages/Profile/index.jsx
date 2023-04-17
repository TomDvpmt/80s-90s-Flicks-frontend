import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import ErrorMessage from "../components/ErrorMessage";
import UserForm from "../../components/UserForm";

import { setUserInfo } from "../../utils/requests";

import { selectUserInfo } from "../../services/utils/selectors";

import { Typography } from "@mui/material";

const Profile = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);

    const [showUpdateValidation, setShowUpdateValidation] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");

    const user = useSelector(selectUserInfo());

    const handleUpdateUser = () => {
        setShowUpdateValidation(false);
        setShowUpdateForm((showUpdateForm) => !showUpdateForm);
    };

    return (
        <main>
            <Typography component="h1" variant="h1">
                My Profile
            </Typography>
            {showUpdateValidation && <p>Profil mis à jour.</p>}
            <ul>
                <li>Nom d'utilisateur : {user.username}</li>
                <li>Prénom : {user.firstName}</li>
                <li>Nom : {user.lastName}</li>
                <li>Adresse e-mail : {user.email}</li>
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
                    setShowUpdateValidation={setShowUpdateValidation}
                />
            )}
        </main>
    );
};

export default Profile;
