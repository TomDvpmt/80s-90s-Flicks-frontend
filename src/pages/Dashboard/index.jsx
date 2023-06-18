import { useEffect, useReducer } from "react";
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

const ACTIONS = {
    setUniqueMovies: "setUniqueMovies",
    setMoviesSeenLinks: "setMoviesSeenLinks",
    setMoviesToSeeLinks: "setMoviesToSeeLinks",
    setFavoritesLinks: "setFavoritesLinks",
    setLoading: "setLoading",
    setHasError: "setHasError",
};

const Dashboard = () => {
    const language = useSelector(selectUserLanguage());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const moviesToSee = useSelector(selectUserMoviesToSee());
    const favorites = useSelector(selectUserFavorites());

    const reducer = (state, action) => {
        switch (action.type) {
            case "setUniqueMovies":
                return { ...state, uniqueMovies: action.payload };
            case "setMoviesSeenLinks":
                return { ...state, moviesSeenLinks: action.payload };
            case "setMoviesToSeeLinks":
                return { ...state, moviesToSeeLinks: action.payload };
            case "setFavoritesLinks":
                return { ...state, favoritesLinks: action.payload };
            case "setLoading":
                return { ...state, loading: action.payload };
            case "setHasError":
                return { ...state, hasError: action.payload };
            default:
                throw new Error("Reducer: unknown action.");
        }
    };
    const [state, dispatch] = useReducer(reducer, {
        uniqueMovies: [],
        moviesSeenLinks: [],
        moviesToSeeLinks: [],
        favoritesLinks: [],
        loading: false,
        hasError: false,
    });

    // Get all movies data from MoviesSeen and MoviesToSee, without duplicates
    useEffect(() => {
        dispatch({ type: ACTIONS.setHasError, payload: false });
        dispatch({ type: ACTIONS.setLoading, payload: true });

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
                        dispatch({ type: ACTIONS.setHasError, payload: true });
                    });
            })
        )
            .then((data) =>
                // getting rid of duplicates
                dispatch({
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
                dispatch({ type: ACTIONS.setLoading, payload: false })
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

        dispatch({
            type: ACTIONS.setMoviesSeenLinks,
            payload: getLinks(state.uniqueMovies, moviesSeen),
        });
        dispatch({
            type: ACTIONS.setMoviesToSeeLinks,
            payload: getLinks(state.uniqueMovies, moviesToSee),
        });
        dispatch({
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
