import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import store from "../services/utils/store";
import { userSetLanguage } from "../services/features/user";
import { filtersSetLanguage } from "../services/features/filters";
import { selectUserLanguage, selectUserId } from "../services/utils/selectors";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Language = () => {
    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId());
    const languageOption = useSelector(selectUserLanguage());

    const handleLanguageChange = (e) => {
        store.dispatch(userSetLanguage(e.target.value));
        store.dispatch(filtersSetLanguage(e.target.value));
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URI}users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify({ language: languageOption }),
        }).catch((error) => console.log(error));
    }, [languageOption]);

    return (
        <FormControl
            component="form"
            sx={{
                border: "1px solid black",
                margin: "0 2rem",
                padding: "1rem",
            }}>
            <label htmlFor="language">Langue des résultats : </label>
            <Select
                id="language"
                onChange={handleLanguageChange}
                value={languageOption}>
                <MenuItem key="en" value="en">
                    English
                </MenuItem>
                <MenuItem key="fr" value="fr">
                    Français
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default Language;
