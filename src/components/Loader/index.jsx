import { CircularProgress } from "@mui/material";

const Loader = ({ size, margin }) => {
    return (
        <CircularProgress
            className="loader"
            sx={{
                display: "block",
                margin: "5rem auto",
            }}
            size="5rem"
        />
    );
};

export default Loader;
