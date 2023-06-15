import { useSelector } from "react-redux";

import {
    userAddToMoviesSeen,
    userRemoveFromMoviesSeen,
    userRemoveFromMoviesToSee,
} from "../../features/user";

import {
    selectUserMoviesSeen,
    selectUserMoviesToSee,
} from "../../app/selectors";

import { FormControlLabel, Checkbox } from "@mui/material";

import PropTypes from "prop-types";

const ToggleMovieSeen = ({ toggleMovieInUserMovies, movieId, langData }) => {
    ToggleMovieSeen.propTypes = {
        toggleMovieInUserMovies: PropTypes.func.isRequired,
        movieId: PropTypes.number.isRequired,
        langData: PropTypes.object.isRequired,
    };

    const moviesToSee = useSelector(selectUserMoviesToSee());
    const moviesSeen = useSelector(selectUserMoviesSeen());
    const userWantsToSeeMovie = moviesToSee.includes(movieId);
    const userHasSeenMovie = moviesSeen.includes(movieId);

    const handleMovieSeen = () => {
        if (userHasSeenMovie) {
            toggleMovieInUserMovies(userRemoveFromMoviesSeen);
            return;
        }
        userWantsToSeeMovie &&
            toggleMovieInUserMovies(userRemoveFromMoviesToSee);
        toggleMovieInUserMovies(userAddToMoviesSeen);
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={userHasSeenMovie}
                    onChange={handleMovieSeen}
                    sx={{
                        color: {
                            md: "white",
                        },
                        "&.Mui-checked": {
                            color: {
                                md: "white",
                            },
                        },
                    }}
                />
            }
            label={langData.seen}
        />
    );
};

export default ToggleMovieSeen;
