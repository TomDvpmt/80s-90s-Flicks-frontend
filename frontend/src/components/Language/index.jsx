import { useSelector, useDispatch } from "react-redux";

import { userSetLanguage } from "../../features/user";
import { filtersSetLanguage } from "../../features/filters";
import { selectUserLanguage, selectUserId } from "../../app/selectors";

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
    const dispatch = useDispatch();

    const handleLanguageChange = (e) => {
        dispatch(userSetLanguage(e.target.value));
        dispatch(filtersSetLanguage(e.target.value));
        fetch(`/API/users/${userId}`, {
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
