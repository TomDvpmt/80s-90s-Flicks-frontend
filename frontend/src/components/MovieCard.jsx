import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import PropTypes from "prop-types";

const StyledMovieCard = styled.article`
    position: relative;

    .card__info {
        position: absolute;
        display: none;
        z-index: 2;
        color: white;
    }

    &:hover {
        .card__info {
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

    const [director, setDirector] = useState({});
    const [mainActors, setMainActors] = useState([]);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieData.id}/credits?api_key=2d0a75daa1b16703efb5d87960c9e67e`,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setDirector(
                    data.crew.filter((person) => person.job === "Director")[0]
                );
                setMainActors(
                    data.cast.slice(0, 3).map((actor, index) => (
                        <span key={actor.name}>
                            {actor.name}
                            {index === mainActors.length - 1 ? "" : ", "}
                        </span>
                    ))
                );
            })
            .catch((error) => console.log(error));
    }, [mainActors, movieData.id]);

    return (
        <StyledMovieCard>
            <Link to={`/movies/${movieData.id}`}>
                <div className="card__info">
                    <h3>{movieData.title}</h3>
                    <p>({movieData.originalTitle})</p>
                    <p>
                        {director.name} | {movieData.releaseDate.slice(0, 4)}
                    </p>
                    <p>Avec {mainActors}</p>
                </div>
                <img
                    src={
                        "https://image.tmdb.org/t/p/w300" + movieData.posterPath
                    }
                    alt={movieData.title}
                />
            </Link>
        </StyledMovieCard>
    );
};

export default MovieCard;
