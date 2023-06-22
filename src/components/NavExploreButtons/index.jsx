import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectUserToken } from "../../features/userSlice";
import {
    setShowLoggedOnlyDialog,
    setShowSearchMovieDialog,
} from "../../features/dialogsSlice";
import { setDestination } from "../../features/pageSlice";

import SearchMovieDialog from "../SearchMovieDialog";
import LoggedOnlyDialog from "../LoggedOnlyDialog";

import theme from "../../styles/theme";
import { IconButton, Box } from "@mui/material";

import { Search, Home } from "@mui/icons-material";

const NavExploreButtons = () => {
    const token = useSelector(selectUserToken);
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (token) {
            dispatch(setShowSearchMovieDialog(true));
            return;
        }
        dispatch(setDestination("/"));
        dispatch(setShowLoggedOnlyDialog(true));
    };

    return (
        <>
            <Box>
                <IconButton
                    component={Link}
                    to="/"
                    sx={{ color: theme.palette.text.darkBg }}>
                    <Home sx={{ fontSize: "2.2rem" }} />
                </IconButton>
                <IconButton
                    onClick={handleSearch}
                    sx={{ color: theme.palette.text.darkBg }}>
                    <Search sx={{ fontSize: "2.2rem" }} />
                </IconButton>
            </Box>
            <SearchMovieDialog />
            <LoggedOnlyDialog />
        </>
    );
};

export default NavExploreButtons;
