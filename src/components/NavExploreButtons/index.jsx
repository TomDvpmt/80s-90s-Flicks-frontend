import { useReducer } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserIsSignedIn } from "../../features/userSlice";

import SearchMovieDialog from "../SearchMovieDialog";
import LoggedOnlyDialog from "../LoggedOnlyDialog";

import theme from "../../styles/theme";
import { IconButton, Box } from "@mui/material";

import { Search, Home } from "@mui/icons-material";

const ACTIONS = {
    setShowSearchMovieDialog: "setShowSearchMovieDialog",
    setShowLoggedOnlyDialog: "setShowLoggedOnlyDialog",
};

const NavExploreButtons = () => {
    const isSignedIn = useSelector(selectUserIsSignedIn);

    const reducer = (state, { type, payload }) => {
        switch (type) {
            case "setShowSearchMovieDialog":
                return { ...state, showSearchMovieDialog: payload };
            case "setShowLoggedOnlyDialog":
                return { ...state, showLoggedOnlyDialog: payload };
            default:
                throw new Error("Reducer: unknown action.");
        }
    };

    const [state, localDispatch] = useReducer(reducer, {
        showSearchMovieDialog: false,
        showLoggedOnlyDialog: false,
    });

    const handleSearch = () => {
        isSignedIn
            ? localDispatch({
                  type: ACTIONS.setShowSearchMovieDialog,
                  payload: true,
              })
            : localDispatch({
                  type: ACTIONS.setShowLoggedOnlyDialog,
                  payload: true,
              });
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
                parentReducer={{ ACTIONS, state, localDispatch }}
            />
            <LoggedOnlyDialog reducer={{ ACTIONS, state, localDispatch }} />
        </>
    );
};

export default NavExploreButtons;
