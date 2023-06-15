import { Link } from "react-router-dom";

import { Box } from "@mui/material";

import theme from "../../assets/styles/theme";

const Error404 = () => {
    return (
        <Box
            textAlign="center"
            sx={{
                "& *": {
                    color: theme.palette.primary.main,
                    fontWeight: "400",

                    "&:hover": {
                        textDecoration: "underline",
                    },
                },
            }}>
            <Link to="/">Revenir à l'accueil</Link>
        </Box>
    );
};

export default Error404;
