import theme from "../../styles/theme";
import { Box, Typography } from "@mui/material";

const LongWaitMessage = () => {
    return (
        <Box
            m="0 1rem 2rem"
            p="2rem"
            maxWidth="600px"
            bgcolor={theme.palette.background.darkest}
            sx={{
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "5px",
                "& .highlight": {
                    fontWeight: "700",
                },
            }}>
            <Typography
                pb="1rem"
                variant="h4"
                color={theme.palette.text.darkBg}
                fontWeight="500">
                Ce site est hébergé en partie par Render.com, qui impose un
                <span className="highlight">
                    {" "}
                    délai important lors de la première connexion à l'API
                </span>
                .
            </Typography>
            <Typography
                variant="h4"
                color={theme.palette.text.darkBg}
                fontWeight="500">
                Merci de patienter, vous allez bientôt pouvoir tester
                l'application !
            </Typography>
        </Box>
    );
};

export default LongWaitMessage;
