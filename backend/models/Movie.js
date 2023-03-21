const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    tmdbId: {type: Number},
    title: {type: String},
    tagline: {type: String},
    genres: {type: Array},
    overview: {type: String},
    spokenLanguages: {type: String},
    releaseDate: {type: Date},
    backdropPath: {type: String},
    posterPath: {type: String}, 
    budget: {type: Number},
    revenue: {type: Number},
})

module.exports = mongoose.model("Movie", movieSchema);