import { useSelector, useDispatch } from "react-redux";

import ToggleFavorite from "../ToggleFavorite";
import ToggleMovieSeen from "../ToggleMovieSeen";
import ToggleMovieToSee from "../ToggleMovieToSee";

import {
    addToMoviesToSee,
    addToMoviesSeen,
    removeFromMoviesToSee,
    removeFromMoviesSeen,
    selectUserId,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../../features/userSlice";

import { updateUserMoviesInDB } from "../../utils/user";

import { Box, FormGroup } from "@mui/material";

import PropTypes from "prop-types";

const MovieCheckboxes = ({ movieId, langData }) => {
    MovieCheckboxes.propTypes = {
        movieId: PropTypes.number.isRequired,
        langData: PropTypes.object.isRequired,
    };

    const userId = useSelector(selectUserId);
    const moviesToSee = useSelector(selectUserMoviesToSee);
    const moviesSeen = useSelector(selectUserMoviesSeen);
    const dispatch = useDispatch();

    const toggleMovieInUserMovies = (action) => {
        let bodyObject = {};
        switch (action) {
            case addToMoviesToSee:
                bodyObject = { moviesToSee: [...moviesToSee, movieId] };
                break;
            case removeFromMoviesToSee:
                bodyObject = {
                    moviesToSee: moviesToSee.filter((id) => id !== movieId),
                };
                break;
            case addToMoviesSeen:
                bodyObject = { moviesSeen: [...moviesSeen, movieId] };
                break;
            case removeFromMoviesSeen:
                bodyObject = {
                    moviesSeen: moviesSeen.filter((id) => id !== movieId),
                };
                break;
            default:
                bodyObject = {};
        }

        dispatch(action(movieId));
        try {
            updateUserMoviesInDB(userId, bodyObject);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                gridColumn: "1",
                gridRow: "2",
                justifySelf: "center",
                padding: ".5rem",
            }}>
            <ToggleFavorite movieId={movieId} />
            <Box component="form">
                <FormGroup>
                    <ToggleMovieSeen
                        movieId={movieId}
                        langData={langData}
                        toggleMovieInUserMovies={toggleMovieInUserMovies}
                    />
                    <ToggleMovieToSee
                        movieId={movieId}
                        langData={langData}
                        toggleMovieInUserMovies={toggleMovieInUserMovies}
                    />
                </FormGroup>
            </Box>
        </Box>
    );
};

export default MovieCheckboxes;
