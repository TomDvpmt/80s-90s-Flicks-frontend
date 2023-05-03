import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MovieCard from "../../components/MovieCard";
import DashboardTabs from "../../components/DashboardTabs";

import {
    selectUserMoviesSeen,
    selectUserMoviesToSee,
    selectUserFavorites,
    selectUserLanguage,
} from "../../app/selectors";

import { getMovieData } from "../../utils/movie";

const Dashboard = () => {
    const language = useSelector(selectUserLanguage());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const moviesToSee = useSelector(selectUserMoviesToSee());
    const favorites = useSelector(selectUserFavorites());

    const [uniqueMovies, setUniqueMovies] = useState([]);
    const [moviesSeenLinks, setMoviesSeenLinks] = useState([]);
    const [moviesToSeeLinks, setMoviesToSeeLinks] = useState([]);
    const [favoritesLinks, setFavoritesLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Get all movies data from MoviesSeen and MoviesToSee, without duplicates
    useEffect(() => {
        setHasError(false);
        setLoading(true);
        const allMoviesIds = moviesSeen?.concat(moviesToSee).concat(favorites);
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
                    .catch((error) => {
                        console.log(error);
                        setHasError(true);
                    });
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

    return (
        <DashboardTabs
            moviesSeenLinks={moviesSeenLinks}
            moviesToSeeLinks={moviesToSeeLinks}
            favoritesLinks={favoritesLinks}
            loading={loading}
            hasError={hasError}
        />
    );
};

export default Dashboard;
