import { useSelector, useDispatch } from "react-redux";

import ToggleFavorite from "../ToggleFavorite";
import ToggleMovieSeen from "../ToggleMovieSeen";
import ToggleMovieToSee from "../ToggleMovieToSee";

import {
    userAddToMoviesToSee,
    userRemoveFromMoviesToSee,
    userAddToMoviesSeen,
    userRemoveFromMoviesSeen,
} from "../../features/user";
import {
    selectUserId,
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../../app/selectors";
import { updateUserMoviesInDB } from "../../utils/user";

import { Box, FormGroup } from "@mui/material";

import PropTypes from "prop-types";

const MovieCheckboxes = ({ movieId, langData }) => {
    MovieCheckboxes.propTypes = {
        movieId: PropTypes.string.isRequired,
        langData: PropTypes.object.isRequired,
    };

    const userId = useSelector(selectUserId());
    const moviesToSee = useSelector(selectUserMoviesToSee());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const dispatch = useDispatch();

    const toggleMovieInUserMovies = (action) => {
        let bodyObject = {};
        switch (action) {
            case userAddToMoviesToSee:
                bodyObject = { moviesToSee: [...moviesToSee, movieId] };
                break;
            case userRemoveFromMoviesToSee:
                bodyObject = {
                    moviesToSee: moviesToSee.filter((id) => id !== movieId),
                };
                break;
            case userAddToMoviesSeen:
                bodyObject = { moviesSeen: [...moviesSeen, movieId] };
                break;
            case userRemoveFromMoviesSeen:
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
