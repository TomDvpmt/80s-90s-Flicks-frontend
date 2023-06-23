import Branding from "../../components/Branding";

import banner from "../../assets/img/banner/banner-lost-ark-sunset.webp";

import { Box } from "@mui/material";

const Header = () => {
    return (
        <Box
            component="header"
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
            minHeight="100px"
            sx={{
                backgroundImage: `url(${banner})`,
                backgroundPositionX: "center",
                backgroundPositionY: "top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}>
            <Branding location="header" />
        </Box>
    );
};

export default Header;
