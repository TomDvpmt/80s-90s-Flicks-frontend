const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    favoriteGenres: {type: Array},
    imgUrl: {type: String}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);