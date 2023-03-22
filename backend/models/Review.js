const mongoose = require("mongoose");
const User = require("./User");

const reviewSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: User
    },
    title: {type: String, required: true},
    content: {type: String, required: true},
    rating: {type: Number, required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);