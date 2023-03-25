import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    const [mainActors, setMainActors] = useState([""]);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieData.id}/credits?api_key=2d0a75daa1b16703efb5d87960c9e67e`,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((data) => {
                data.crew[0]
                    ? setDirector(
                          data.crew.filter(
                              (person) => person.job === "Director"
                          )[0].name
                      )
                    : setDirector("");

                data.cast.length > 0
                    ? setMainActors(
                          data.cast
                              .slice(
                                  0,
                                  data.cast.length >= 3 ? 3 : data.cast.length
                              )
                              .map((actor, index) => (
                                  <span key={actor.name}>
                                      {actor.name}
                                      {index === mainActors.length - 1
                                          ? ""
                                          : ", "}
                                  </span>
                              ))
                      )
                    : setMainActors([""]);
            })
            .catch((error) => console.log(error));
    }, [mainActors.length, movieData.id]);

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
                    {mainActors[0] && <p>Avec {mainActors}</p>}
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
                    <img src="" width="300" height="450" />
                )}
            </Link>
        </StyledMovieCard>
    );
};

export default MovieCard;
