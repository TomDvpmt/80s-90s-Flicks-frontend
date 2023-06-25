import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    selectToken,
    setShowLoggedOnlyDialog,
    selectShowLoggedOnlyDialog,
    selectShowLoginDialog,
    selectShowRegisterDialog,
} from "../../../../features/user/userSlice";
import {
    setShowSearchMovieDialog,
    selectShowSearchMovieDialog,
} from "../../../../features/movie/movieSlice";
import { setDestination } from "../../navigationSlice";

import SearchMovieDialog from "../../../../features/movie/components/SearchMovieDialog";
import LoggedOnlyDialog from "../../../../features/user/components/LoggedOnlyDialog";
import LoginDialog from "../../../../features/user/components/LoginDialog";
import RegisterDialog from "../../../../features/user/components/RegisterDialog";

import theme from "../../../../theme/theme";
import { IconButton, Box } from "@mui/material";

import { Search, Home } from "@mui/icons-material";

const NavExploreButtons = () => {
    const token = useSelector(selectToken);
    const showSearchMovieDialog = useSelector(selectShowSearchMovieDialog);
    const showLoggedOnlyDialog = useSelector(selectShowLoggedOnlyDialog);
    const showLoginDialog = useSelector(selectShowLoginDialog);
    const showRegisterDialog = useSelector(selectShowRegisterDialog);
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
            {showSearchMovieDialog && <SearchMovieDialog />}
            {showLoggedOnlyDialog && <LoggedOnlyDialog />}
            {showLoginDialog && <LoginDialog />}
            {showRegisterDialog && <RegisterDialog />}
        </>
    );
};

export default NavExploreButtons;
