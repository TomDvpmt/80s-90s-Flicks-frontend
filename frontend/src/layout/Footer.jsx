import Branding from "../components/Branding";

import {
    Box,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Link,
} from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: "var(--color-tertiary)" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}>
                <Branding location="footer" />
                <div>Footer navigation</div>
            </Box>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Main API : </TableCell>
                        <TableCell>
                            <Link
                                href="https://developers.themoviedb.org/3"
                                target="_blank"
                                rel="noopener">
                                The Movie Database
                            </Link>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Source code : </TableCell>
                        <TableCell>
                            <Link
                                href="https://github.com/TomDvpmt/80s-90s-Flix"
                                target="_blank"
                                rel="noopener">
                                github.com/TomDvpmt/80s-90s-Flix
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};

export default Footer;
