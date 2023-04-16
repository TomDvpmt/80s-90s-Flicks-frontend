import { useSelector } from "react-redux";

import { API_URI } from "../../utils/config";

import store from "../../services/utils/store";
import { userSetLanguage } from "../../services/features/user";
import { filtersSetLanguage } from "../../services/features/filters";
import {
    selectUserLanguage,
    selectUserId,
} from "../../services/utils/selectors";

import {
    Paper,
    FormControl,
    Typography,
    Select,
    MenuItem,
} from "@mui/material";

const Language = () => {
    const token = sessionStorage.getItem("token");
    const userId = useSelector(selectUserId());
    const languageOption = useSelector(selectUserLanguage());

    const handleLanguageChange = (e) => {
        store.dispatch(userSetLanguage(e.target.value));
        store.dispatch(filtersSetLanguage(e.target.value));
        fetch(`${API_URI}users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify({ language: e.target.value }),
        }).catch((error) => console.log(error));
    };

    return (
        <Paper
            sx={{
                margin: "0 2rem",
                padding: "1rem",
            }}>
            <FormControl
                component="form"
                sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "1rem",
                }}>
                <Typography component="label" htmlFor="language">
                    Langue des résultats :{" "}
                </Typography>
                {languageOption && (
                    <Select
                        id="language"
                        onChange={handleLanguageChange}
                        value={languageOption}>
                        <MenuItem key="en" value="en">
                            Anglais
                        </MenuItem>
                        <MenuItem key="fr" value="fr">
                            Français
                        </MenuItem>
                    </Select>
                )}
            </FormControl>
        </Paper>
    );
};

export default Language;
