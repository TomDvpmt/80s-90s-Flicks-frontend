import { Link } from "react-router-dom";

const setCastAndCrew = async (page, movieId, setDirector, setActors) => {
    fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2d0a75daa1b16703efb5d87960c9e67e`,
        {
            method: "GET",
        }
    )
        .then((response) => response.json())
        .then((data) => {
            const movieDirector = data.crew.filter(
                (person) => person.job === "Director"
            )[0];
            setDirector(movieDirector ? movieDirector.name : "");

            const numberOfActors = page === "home" ? 3 : 10;
            data.cast.length > 0
                ? setActors(
                      data.cast
                          .slice(
                              0,
                              data.cast.length >= numberOfActors
                                  ? numberOfActors
                                  : data.cast.length
                          )
                          .map((actor, index) => (
                              <Link key={actor.id} to={`/person/${actor.id}`}>
                                  {actor.name}
                                  {index === numberOfActors - 1 ? "" : ", "}
                              </Link>
                          ))
                  )
                : setActors([""]);
        })
        .catch((error) => console.log(error));
};

export default setCastAndCrew;
