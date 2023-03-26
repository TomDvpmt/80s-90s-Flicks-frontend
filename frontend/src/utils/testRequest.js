import fetchData from "./fetchData";

const testRequest = (personId) => {
    fetchData(
        `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=fr`
    )
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
};

export default testRequest;
