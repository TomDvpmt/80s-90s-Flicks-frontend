import { useState } from "react";

import SearchMovieDialog from "../SearchMovieDialog";

import theme from "../../assets/styles/theme";
import { IconButton, Box } from "@mui/material";

import { Search } from "@mui/icons-material";

const NavExploreButton = () => {
    const [showSearchMovieDialog, setShowSearchMovieDialog] = useState(false);

    return (
        <>
            <Box>
                <IconButton
                    onClick={() => setShowSearchMovieDialog(true)}
                    sx={{ color: theme.palette.text.darkBg }}>
                    <Search sx={{ fontSize: "2.5rem" }} />
                </IconButton>
            </Box>
            <SearchMovieDialog
                showSearchMovieDialog={showSearchMovieDialog}
                setShowSearchMovieDialog={setShowSearchMovieDialog}
            />
        </>
    );
};

export default NavExploreButton;
