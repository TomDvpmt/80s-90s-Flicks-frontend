import Branding from "../../components/Branding";

import banner from "../../assets/img/banner/banner-crusade-riders-reversed.webp";

import { Box } from "@mui/material";

const Header = () => {
    return (
        <Box
            component="header"
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
            sx={{
                backgroundImage: `url(${banner})`,
                backgroundPositionX: "center",
                backgroundPositionY: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}>
            <Branding location="header" />
        </Box>
    );
};

export default Header;
