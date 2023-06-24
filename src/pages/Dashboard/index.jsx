import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";

import MovieCard from "../../components/MovieCard";
import DashboardTabs from "../../components/DashboardTabs";

import {
    selectUserMoviesSeen,
    selectUserMoviesToSee,
    selectUserFavorites,
    selectUserLanguage,
} from "../../features/userSlice";

import { getMovieData } from "../../utils/movie";

const ACTIONS = {
    setUniqueMovies: "setUniqueMovies",
    setMoviesSeenLinks: "setMoviesSeenLinks",
    setMoviesToSeeLinks: "setMoviesToSeeLinks",
    setFavoritesLinks: "setFavoritesLinks",
    setLoading: "setLoading",
    setHasError: "setHasError",
};

const Dashboard = () => {
    const language = useSelector(selectUserLanguage);
    const moviesSeen = useSelector(selectUserMoviesSeen);
    const moviesToSee = useSelector(selectUserMoviesToSee);
    const favorites = useSelector(selectUserFavorites);

    const reducer = (state, { type, payload }) => {
        switch (type) {
            case "setUniqueMovies":
                return { ...state, uniqueMovies: payload };
            case "setMoviesSeenLinks":
                return { ...state, moviesSeenLinks: payload };
            case "setMoviesToSeeLinks":
                return { ...state, moviesToSeeLinks: payload };
            case "setFavoritesLinks":
                return { ...state, favoritesLinks: payload };
            case "setLoading":
                return { ...state, loading: payload };
            case "setHasError":
                return { ...state, hasError: payload };
            default:
                throw new Error("Reducer: unknown action.");
        }
    };
    const [state, localDispatch] = useReducer(reducer, {
        uniqueMovies: [],
        moviesSeenLinks: [],
        moviesToSeeLinks: [],
        favoritesLinks: [],
        loading: false,
        hasError: false,
    });

    // Get all movies data from MoviesSeen and MoviesToSee, without duplicates
    useEffect(() => {
        localDispatch({ type: ACTIONS.setHasError, payload: false });
        localDispatch({ type: ACTIONS.setLoading, payload: true });

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
                            posterPath: movie.poster_path || "",
                        };
                    })
                    .catch((error) => {
                        console.log(error);
                        localDispatch({
                            type: ACTIONS.setHasError,
                            payload: true,
                        });
                    });
            })
        )
            .then((data) =>
                // getting rid of duplicates
                localDispatch({
                    type: ACTIONS.setUniqueMovies,
                    payload: data.filter(
                        (movie, index, array) =>
                            array.findIndex((mov) => mov.id === movie.id) ===
                            index
                    ),
                })
            )
            .catch((error) => console.log(error))
            .finally(() =>
                localDispatch({ type: ACTIONS.setLoading, payload: false })
            );
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

        localDispatch({
            type: ACTIONS.setMoviesSeenLinks,
            payload: getLinks(state.uniqueMovies, moviesSeen),
        });
        localDispatch({
            type: ACTIONS.setMoviesToSeeLinks,
            payload: getLinks(state.uniqueMovies, moviesToSee),
        });
        localDispatch({
            type: ACTIONS.setFavoritesLinks,
            payload: getLinks(state.uniqueMovies, favorites),
        });
    }, [state.uniqueMovies, moviesSeen, moviesToSee, favorites]);

    return (
        <DashboardTabs
            moviesSeenLinks={state.moviesSeenLinks}
            moviesToSeeLinks={state.moviesToSeeLinks}
            favoritesLinks={state.favoritesLinks}
            loading={state.loading}
            hasError={state.hasError}
        />
    );
};

export default Dashboard;
