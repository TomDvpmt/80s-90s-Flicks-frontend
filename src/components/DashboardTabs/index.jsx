import { useState } from "react";
import { useSelector } from "react-redux";

import { selectUserLanguage } from "../../features/userSlice";

import MovieCardsGrid from "../MovieCardsGrid";
import Loader from "../Loader";
import ErrorBoundary from "../ErrorBoundary";

import theme from "../../styles/theme";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { LocalMovies, Check, Star } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";

import PropTypes from "prop-types";

const TabPanel = ({ children, index, value }) => {
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            flexGrow="1">
            {value === index && <Box>{children}</Box>}
        </Box>
    );
};

const DashboardTabs = ({
    moviesToSeeLinks,
    moviesSeenLinks,
    favoritesLinks,
    loading,
    hasError,
}) => {
    DashboardTabs.propTypes = {
        moviesToSeeLinks: PropTypes.array.isRequired,
        moviesSeenLinks: PropTypes.array.isRequired,
        favoritesLinks: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        hasError: PropTypes.bool.isRequired,
    };

    const language = useSelector(selectUserLanguage);
    const [value, setValue] = useState(0);

    const mdBreakpoint = useMediaQuery("(min-width:900px)");

    const allyProps = (index) => {
        return {
            id: `vertical-tab-${index}`,
            "aria-controls": `vertical-tabpanel-${index}`,
        };
    };

    const dashboardTabs = [];

    class DashboardTab {
        constructor(movies, label, icon) {
            this.id = label;
            this.primary =
                theme.languages[language].components.sideNav.primary[label];
            this.secondary = `${theme.languages[language].components.sideNav.secondary} ${movies.length}`;
            this.icon = icon;
            this.movies = movies;

            dashboardTabs.push(this);
        }
    }

    new DashboardTab(
        moviesToSeeLinks,
        "toSee",
        <LocalMovies sx={{ color: theme.palette.brandingWarm.main }} />
    );
    new DashboardTab(
        moviesSeenLinks,
        "seen",
        <Check sx={{ color: theme.palette.brandingWarm.main }} />
    );
    new DashboardTab(
        favoritesLinks,
        "favorites",
        <Star sx={{ color: theme.palette.brandingWarm.main }} />
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
            }}>
            <Tabs
                orientation={mdBreakpoint ? "vertical" : "horizontal"}
                centered
                value={value}
                onChange={handleChange}
                aria-label="dashboard tabs"
                sx={{
                    mb: { xs: "1rem" },
                    p: ".5rem",
                    borderRight: mdBreakpoint ? 1 : 0,
                    borderColor: "divider",
                }}>
                {dashboardTabs?.map((item, index) => (
                    <Tab
                        key={index}
                        icon={item.icon}
                        iconPosition={mdBreakpoint ? "start" : "top"}
                        sx={{ p: { xs: ".5rem", sm: "2rem" } }}
                        label={
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    minWidth: "max-content",
                                }}>
                                <Typography
                                    fontWeight="700"
                                    sx={{
                                        fontSize: {
                                            xs: ".7rem",
                                            sm: ".9rem",
                                            md: "initial",
                                        },
                                    }}>
                                    {item.primary}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: ".7rem",
                                            sm: ".9rem",
                                            md: "initial",
                                        },
                                        textTransform: "capitalize",
                                    }}>
                                    {item.secondary}
                                </Typography>
                            </Box>
                        }
                        {...allyProps(0)}
                    />
                ))}
            </Tabs>

            {loading ? (
                <Loader />
            ) : (
                <Box width="100%" p="0 1rem">
                    {hasError ? (
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <ErrorBoundary page="dashboard" />
                        </Box>
                    ) : (
                        dashboardTabs?.map((item, index) => (
                            <TabPanel
                                key={index}
                                value={value}
                                index={index}
                                children={
                                    <MovieCardsGrid movies={item.movies} />
                                }
                            />
                        ))
                    )}
                </Box>
            )}
        </Box>
    );
};

export default DashboardTabs;
