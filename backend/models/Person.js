const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
    tmdbId: {type: Number},
    name: {type: String},
    gender: {type: String},
    birthday: {type: Date},
    deathday: {type: Date},
    creditedIn: {type: Array},
    biography: {type: String},
});

module.exports = mongoose.model("Person", personSchema);