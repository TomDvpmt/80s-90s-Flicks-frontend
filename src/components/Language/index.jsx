import { useSelector, useDispatch } from "react-redux";

import { setLanguage } from "../../features/filtersSlice";
import { selectUserId, selectUserLanguage } from "../../features/userSlice";

import { BASE_API_URI } from "../../utils/config";

import {
    Paper,
    FormControl,
    Typography,
    Select,
    MenuItem,
} from "@mui/material";

const Language = () => {
    const userId = useSelector(selectUserId);
    const languageOption = useSelector(selectUserLanguage);
    const dispatch = useDispatch();

    const handleLanguageChange = (e) => {
        dispatch(setLanguage(e.target.value));
        fetch(`${BASE_API_URI}/API/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ language: e.target.value }),
            credentials: "include",
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
