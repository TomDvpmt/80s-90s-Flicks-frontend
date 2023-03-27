const getAllFilters = (inheritedFilter) => [
    inheritedFilter
        ? inheritedFilter
        : { name: "inheritedFilter", param: "", value: "" },
    {
        name: "allYearsMin",
        param: "&primary_release_date.gte=",
        value: "1980-01-01",
    },
    {
        name: "allYearsMax",
        param: "&release_date.lte=",
        value: "1999-12-31",
    },
    { name: "language", param: "&language=", value: "fr" },
    {
        name: "page",
        param: "&page=",
        value: 1,
    },
    {
        name: "primaryReleaseYear",
        param: "&primary_release_year=",
        value: "",
    },
    { name: "sortBy", param: "&sort_by=", value: "popularity.desc" },
    { name: "withGenres", param: "&with_genres=", value: "" },
    {
        name: "originalLanguage",
        param: "&with_original_language=",
        value: "en",
    },
    { name: "withPeople", param: "&with_people=", value: "" },
];

const years = ["Toutes"];
for (let i = 1980; i < 2000; i++) {
    years.push(i);
}

const getGenres = async () => {
    try {
        const results = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=2d0a75daa1b16703efb5d87960c9e67e&language=fr`,
            {
                method: "GET",
            }
        );
        const data = await results.json();
        return data.genres;
    } catch (error) {
        console.log(error);
    }
};

export { getAllFilters, years, getGenres };
