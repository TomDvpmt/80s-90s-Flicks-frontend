const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        required: [true, "Nom d'utilisateur requis."],
        unique: true
    },
    email: {
        type: String, 
        required: [true, "Adresse e-mail requise."],
        unique: true
    },
    firstName: {type: String},
    lastName: {type: String},
    favoriteGenres: {type: Array},
    moviesLiked: {type: Array},
    moviesSeen: {type: Array},
    moviesToSee: {type: Array},
    imgUrl: {type: String}
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);