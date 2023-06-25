import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../../features/user/userSlice";

import InputUsername from "../../../components/InputUsername";
import InputEmail from "../../../components/InputEmail";
import InputFirstName from "../../../components/InputFirstName";
import InputLastName from "../../../components/InputLastName";
import ErrorMessage from "../../../components/ErrorMessage";

import theme from "../../../theme/theme";
import { Collapse, Box, Button } from "@mui/material";

import PropTypes from "prop-types";

const ProfileUpdateUserInfoForm = ({ reducer, handleSubmit }) => {
    ProfileUpdateUserInfoForm.propTypes = {
        reducer: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    };

    const language = useSelector(selectUserLanguage);

    return (
        <Collapse in={reducer.state.showUpdateInfosForm}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: theme.maxWidth.userForm,
                    margin: "0 auto 3rem",
                }}>
                <ErrorMessage errorMessage={reducer.state.errorMessage} />
                <InputUsername reducer={reducer} />
                <InputEmail reducer={reducer} />
                <InputFirstName reducer={reducer} />
                <InputLastName reducer={reducer} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            margin: `${theme.margin.buttonTop.spaced} 0`,
                            color: "white",
                        }}>
                        {theme.languages[language].pages.profile.update.submit}
                    </Button>
                </Box>
            </Box>
        </Collapse>
    );
};

export default ProfileUpdateUserInfoForm;
