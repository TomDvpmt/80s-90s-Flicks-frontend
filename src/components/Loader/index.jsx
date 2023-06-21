import theme from "../../styles/theme";
import { CircularProgress, Modal, Box } from "@mui/material";

import PropTypes from "prop-types";

const Loader = ({
    size = theme.maxWidth.loader.large,
    marginY = theme.maxWidth.loader.large,
    modal = false,
}) => {
    Loader.propTypes = {
        size: PropTypes.string,
        marginY: PropTypes.string,
        modal: PropTypes.bool,
    };

    const handleClose = () => true;

    return modal ? (
        <Modal open={true} onClose={handleClose}>
            <Box
                minWidth="100vw"
                minHeight="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center">
                <CircularProgress
                    className="loader"
                    sx={{
                        display: "block",
                        margin: `${theme.maxWidth.loader.large} auto`,
                    }}
                    size={theme.maxWidth.loader.large}
                />
            </Box>
        </Modal>
    ) : (
        <CircularProgress
            className="loader"
            sx={{
                display: "block",
                margin: `${marginY} auto`,
            }}
            size={size}
        />
    );
};

export default Loader;
