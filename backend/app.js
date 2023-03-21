require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const usersRoutes = require("./routes/usersRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const personsRoutes = require("./routes/personsRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("============== Application connectée à MongoDB =============="))
.catch(error => console.log("==================== Connexion à MongoDB impossible : ", error, "======================"))

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use("/API/users", usersRoutes);
app.use("/API/movies", moviesRoutes);
app.use("/API/persons", personsRoutes);
app.use("/API/reviews", reviewsRoutes);

module.exports = app;