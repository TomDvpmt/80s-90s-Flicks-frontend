import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserIsSignedIn } from "../../features/userSlice";

import SearchMovieDialog from "../SearchMovieDialog";
import LoggedOnlyDialog from "../LoggedOnlyDialog";

import theme from "../../styles/theme";
import { IconButton, Box } from "@mui/material";

import { Search, Home } from "@mui/icons-material";

const NavExploreButtons = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn);
    const [showSearchMovieDialog, setShowSearchMovieDialog] = useState(false);
    const [showLoggedOnlyDialog, setShowLoggedOnlyDialog] = useState(false);

    const handleSearch = () => {
        isSignedIn
            ? setShowSearchMovieDialog(true)
            : setShowLoggedOnlyDialog(true);
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
            <SearchMovieDialog
                showSearchMovieDialog={showSearchMovieDialog}
                setShowSearchMovieDialog={setShowSearchMovieDialog}
            />
            <LoggedOnlyDialog
                showLoggedOnlyDialog={showLoggedOnlyDialog}
                setShowLoggedOnlyDialog={setShowLoggedOnlyDialog}
            />
        </>
    );
};

export default NavExploreButtons;
