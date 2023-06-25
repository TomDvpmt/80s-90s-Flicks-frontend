import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../../features/user/userSlice";

import theme from "../../../theme/theme";
import {
    Paper,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";

import PropTypes from "prop-types";

const ProfileUserInfo = ({
    prevUsername,
    prevEmail,
    prevFirstName,
    prevLastName,
}) => {
    ProfileUserInfo.propTypes = {
        prevUsername: PropTypes.string.isRequired,
        prevEmail: PropTypes.string.isRequired,
        prevFirstName: PropTypes.string.isRequired,
        prevLastName: PropTypes.string.isRequired,
    };

    const language = useSelector(selectUserLanguage);

    const leftCellStyle = {
        textAlign: "right",
        fontWeight: "700",
    };

    const rightCellStyle = {
        overflowWrap: "break-word",
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ tableLayout: "fixed" }}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={leftCellStyle}>
                            {theme.languages[language].pages.profile.username}
                            &nbsp;:
                        </TableCell>
                        <TableCell sx={rightCellStyle}>
                            {prevUsername}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={leftCellStyle}>
                            {theme.languages[language].pages.profile.email}
                            &nbsp;:
                        </TableCell>
                        <TableCell sx={rightCellStyle}>{prevEmail}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={leftCellStyle}>
                            {theme.languages[language].pages.profile.firstName}
                            &nbsp;:
                        </TableCell>
                        <TableCell sx={rightCellStyle}>
                            {prevFirstName}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={leftCellStyle}>
                            {theme.languages[language].pages.profile.lastName}
                            &nbsp;:
                        </TableCell>
                        <TableCell sx={rightCellStyle}>
                            {prevLastName}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProfileUserInfo;
