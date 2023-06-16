import { useState } from "react";
import { Link } from "react-router-dom";

import SearchMovieDialog from "../SearchMovieDialog";

import theme from "../../assets/styles/theme";
import { IconButton, Box } from "@mui/material";

import { Search, Home } from "@mui/icons-material";

const NavExploreButtons = () => {
    const [showSearchMovieDialog, setShowSearchMovieDialog] = useState(false);

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
                    onClick={() => setShowSearchMovieDialog(true)}
                    sx={{ color: theme.palette.text.darkBg }}>
                    <Search sx={{ fontSize: "2.2rem" }} />
                </IconButton>
            </Box>
            <SearchMovieDialog
                showSearchMovieDialog={showSearchMovieDialog}
                setShowSearchMovieDialog={setShowSearchMovieDialog}
            />
        </>
    );
};

export default NavExploreButtons;
