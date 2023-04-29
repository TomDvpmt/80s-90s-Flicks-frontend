import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DashboardSection from "../../components/DashboardSection";
import MovieCard from "../../components/MovieCard";
import SideNav from "../../layout/SideNav";
import Loader from "../../components/Loader";

import {
    selectUserMoviesSeen,
    selectUserMoviesToSee,
    selectUserFavorites,
    selectUserLanguage,
} from "../../services/utils/selectors";

import { getMovieData } from "../../utils/movie";

import { Box } from "@mui/material";

const Dashboard = () => {
    const language = useSelector(selectUserLanguage());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const moviesToSee = useSelector(selectUserMoviesToSee());
    const favorites = useSelector(selectUserFavorites());

    const [uniqueMovies, setUniqueMovies] = useState([]);
    const [moviesSeenLinks, setMoviesSeenLinks] = useState([]);
    const [moviesToSeeLinks, setMoviesToSeeLinks] = useState([]);
    const [favoritesLinks, setFavoritesLinks] = useState([]);
    const [activeCategory, setActiveCategory] = useState("toSee");
    const [activeCategoryLinks, setActiveCategoryLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get all movies data from MoviesSeen and MoviesToSee, without duplicates
    useEffect(() => {
        setLoading(true);
        const allMoviesIds = moviesSeen.concat(moviesToSee).concat(favorites);
        Promise.all(
            allMoviesIds.map(async (id) => {
                return getMovieData(id, language)
                    .then((movie) => {
                        return {
                            id: movie.id,
                            title: movie.title,
                            originalTitle: movie.original_title,
                            releaseDate: movie.release_date,
                            posterPath: movie.poster_path || "", // to add : default picture
                        };
                    })
                    .catch((error) => console.log(error));
            })
        )
            .then((data) =>
                // getting rid of duplicates
                setUniqueMovies(
                    data.filter(
                        (movie, index, array) =>
                            array.findIndex((mov) => mov.id === movie.id) ===
                            index
                    )
                )
            )
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, [moviesSeen, moviesToSee, favorites, language]);

    // Display movie cards for each section of the dashboard
    useEffect(() => {
        const getLinks = (uniqueMovies, moviesSection) =>
            uniqueMovies
                .filter((movie) => moviesSection.includes(movie.id))
                .map((movie) => {
                    return (
                        <MovieCard
                            key={movie.id}
                            page="dashboard"
                            movie={movie}
                        />
                    );
                });

        setMoviesSeenLinks(getLinks(uniqueMovies, moviesSeen));
        setMoviesToSeeLinks(getLinks(uniqueMovies, moviesToSee));
        setFavoritesLinks(getLinks(uniqueMovies, favorites));
    }, [uniqueMovies, moviesSeen, moviesToSee, favorites]);

    useEffect(() => {
        // setLoading(true);
        switch (activeCategory) {
            case "toSee":
                setActiveCategoryLinks(moviesToSeeLinks);
                break;
            case "seen":
                setActiveCategoryLinks(moviesSeenLinks);
                break;
            case "favorites":
                setActiveCategoryLinks(favoritesLinks);
                break;
            default:
                setActiveCategoryLinks(moviesToSeeLinks);
        }
        // setLoading(false);
    }, [activeCategory, moviesToSeeLinks, moviesSeenLinks, favoritesLinks]);

    return (
        <>
            <Box
                sx={{
                    padding: {
                        sm: ".5rem",
                    },
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                }}>
                <SideNav setActiveCategory={setActiveCategory} />
                <Box
                    sx={{
                        width: "100%",
                        padding: {
                            xs: "0 .5rem .5rem",
                        },
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}>
                    {loading ? (
                        <Loader />
                    ) : (
                        <DashboardSection
                            categoryId={activeCategory}
                            movies={activeCategoryLinks}
                        />
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
