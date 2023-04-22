import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    userAddToMoviesToSee,
    userRemoveFromMoviesToSee,
    userAddToMoviesSeen,
    userRemoveFromMoviesSeen,
} from "../../services/features/user";

import {
    selectUserId,
    selectUserLanguage,
    selectUserMoviesToSee,
    selectUserMoviesSeen,
} from "../../services/utils/selectors";

import { fetchMovieInUser } from "../../utils/movie";

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

import theme from "../../assets/styles/theme";

import PropTypes from "prop-types";

const ToggleMovieSeenOrToSee = ({ movieId }) => {
    ToggleMovieSeenOrToSee.propTypes = {
        movieId: PropTypes.number.isRequired,
    };

    const dispatch = useDispatch();
    const userId = useSelector(selectUserId());
    const language = useSelector(selectUserLanguage());

    const moviesToSee = useSelector(selectUserMoviesToSee());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const userHasSeenMovie = moviesSeen.includes(movieId);
    const userWantsToSeeMovie = moviesToSee.includes(movieId);

    const [langData, setLangData] = useState({});

    useEffect(() => {
        setLangData(theme.languages[language].pages.movie);
    }, [language]);

    const addToMoviesToSee = () => {
        dispatch(userAddToMoviesToSee(movieId));
        try {
            fetchMovieInUser(userId, {
                moviesToSee: [...moviesToSee, movieId],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromMoviesToSee = () => {
        dispatch(userRemoveFromMoviesToSee(movieId));
        try {
            fetchMovieInUser(userId, {
                moviesToSee: moviesToSee.filter((id) => id !== movieId),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addToMoviesSeen = () => {
        dispatch(userAddToMoviesSeen(movieId));
        try {
            fetchMovieInUser(userId, {
                moviesSeen: [...moviesSeen, movieId],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromMoviesSeen = () => {
        dispatch(userRemoveFromMoviesSeen(movieId));
        try {
            fetchMovieInUser(userId, {
                moviesSeen: moviesSeen.filter((id) => id !== movieId),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleMovieToSeeCheckbox = () => {
        if (userWantsToSeeMovie) {
            removeFromMoviesToSee();
        } else {
            addToMoviesToSee();
            userHasSeenMovie && removeFromMoviesSeen();
        }
    };

    const handleMovieSeenCheckbox = () => {
        if (userHasSeenMovie) {
            removeFromMoviesSeen();
        } else {
            addToMoviesSeen();
            userWantsToSeeMovie && removeFromMoviesToSee();
        }
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={userWantsToSeeMovie}
                        onChange={handleMovieToSeeCheckbox}
                    />
                }
                label={langData.toSee}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={userHasSeenMovie}
                        onChange={handleMovieSeenCheckbox}
                    />
                }
                label={langData.seen}
            />
        </FormGroup>
    );
};

export default ToggleMovieSeenOrToSee;
