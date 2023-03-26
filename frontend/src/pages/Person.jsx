import { useEffect } from "react";

import fetchData from "../utils/fetchData";

const Person = () => {
    const personId = ""; // à récupérer

    useEffect(() => {
        fetchData(
            `https://api.themoviedb.org/3/person/${personId}?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=fr`
        );
    }, []);

    return <div>Person</div>;
};

export default Person;
