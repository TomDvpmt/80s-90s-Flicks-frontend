const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    authorId: {type: Number, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    rating: {type: Number, required: true}
});

module.exports = mongoose.model("Review", reviewSchema);