import { useState } from "react";
import { useSelector } from "react-redux";

import { selectPageLocation } from "../../features/pageSlice";

import { LOADER_LONG_WAIT_DURATION } from "../../config/timing";

import LongWaitMessage from "../LongWaitMessage";

import theme from "../../styles/theme";
import { CircularProgress, Modal, Box } from "@mui/material";

import PropTypes from "prop-types";

const Loader = ({
    size = theme.maxWidth.loader.large,
    marginY = theme.maxWidth.loader.large,
    hasMessage = false,
    modal = false,
}) => {
    Loader.propTypes = {
        size: PropTypes.string,
        marginY: PropTypes.string,
        hasMessage: PropTypes.bool,
        modal: PropTypes.bool,
    };

    const page = useSelector(selectPageLocation);

    const [isLongWait, setIsLongWait] = useState(false);

    let ellapsedTime = 0;

    const timer = setInterval(() => {
        ellapsedTime = ellapsedTime + 1000;

        if (ellapsedTime > LOADER_LONG_WAIT_DURATION) {
            clearInterval(timer);
            setIsLongWait(true);
        }
    }, 1000);

    const loaderStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    return modal ? (
        <Modal
            open={true}
            sx={{
                "& .MuiModal-backdrop": {
                    backgroundColor: "rgba(255, 255, 255, .5)",
                },
            }}>
            <Box minWidth="100vw" minHeight="100vh" sx={loaderStyle}>
                <CircularProgress
                    className="loader"
                    sx={{
                        display: "block",
                        margin: `${theme.maxWidth.loader.large} auto`,
                    }}
                    size={theme.maxWidth.loader.large}
                />
                {isLongWait && hasMessage && <LongWaitMessage />}
            </Box>
        </Modal>
    ) : (
        <Box sx={loaderStyle}>
            <CircularProgress
                className="loader"
                sx={{
                    display: "block",
                    margin: `${marginY} auto`,
                }}
                size={size}
            />
        </Box>
    );
};

export default Loader;
