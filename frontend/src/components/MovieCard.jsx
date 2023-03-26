import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import setCastAndCrew from "../utils/setCastAndCrew";

import styled from "styled-components";
import PropTypes from "prop-types";

const StyledMovieCard = styled.article`
    position: relative;

    .card__info {
        position: absolute;
        z-index: 2;
        color: white;

        p {
            display: none;
        }

        h3 {
            display: ${(props) => (props.hasPoster ? "none" : "block")};
        }
    }

    &:hover {
        .card__info p,
        .card__info h3 {
            display: block;
        }

        img {
            opacity: 0.3;
        }
    }
`;

const MovieCard = ({ movieData }) => {
    MovieCard.propTypes = {
        movieData: PropTypes.object,
    };

    const [director, setDirector] = useState("");
    const [actors, setActors] = useState([""]);

    useEffect(() => {
        setCastAndCrew("home", movieData.id, setDirector, setActors);
    }, [actors.length, movieData.id]);

    return (
        <StyledMovieCard hasPoster={movieData.posterPath}>
            <Link to={`/movies/${movieData.id}`}>
                <div className="card__info">
                    <h3>{movieData.title}</h3>
                    <p>{movieData.originalTitle}</p>
                    <p>
                        {director !== "" && director + " | "}
                        {movieData.releaseDate.slice(0, 4)}
                    </p>
                    {actors[0] && <p>Avec {actors}</p>}
                </div>
                {movieData.posterPath !== null ? (
                    <img
                        src={
                            "https://image.tmdb.org/t/p/w300" +
                            movieData.posterPath
                        }
                        alt={movieData.title}
                    />
                ) : (
                    <img
                        src=""
                        width="300"
                        height="450"
                        alt="No poster available"
                    />
                )}
            </Link>
        </StyledMovieCard>
    );
};

export default MovieCard;
