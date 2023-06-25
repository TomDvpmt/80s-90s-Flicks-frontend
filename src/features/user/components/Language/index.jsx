import { useSelector, useDispatch } from "react-redux";

import { selectUserId, selectUserLanguage, setLanguage } from "../../userSlice";

import { API_BASE_URI } from "../../../../config/APIs";

import theme from "../../../../theme/theme";
import {
    Paper,
    FormControl,
    Typography,
    Select,
    MenuItem,
} from "@mui/material";

const Language = () => {
    const userId = useSelector(selectUserId);
    const language = useSelector(selectUserLanguage);
    const dispatch = useDispatch();

    const handleLanguageChange = (e) => {
        fetch(`${API_BASE_URI}/API/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ language: e.target.value }),
            credentials: "include",
        })
            .then(() => dispatch(setLanguage(e.target.value)))
            .catch((error) => console.log(error));
    };

    return (
        <Paper
            sx={{
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
            }}>
            <FormControl
                component="form"
                sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "1rem",
                }}>
                <Typography
                    component="label"
                    htmlFor="language"
                    fontWeight="700">
                    {theme.languages[language].components.language}{" "}
                </Typography>
                {language && (
                    <Select
                        id="language"
                        onChange={handleLanguageChange}
                        value={language}>
                        <MenuItem key="en" value="en">
                            English
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
