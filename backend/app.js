require("dotenv").config();

const express = require("express");
const app = express();
const connectToDb = require("./config/database");
const {errorHandler} = require("./middleware/errorHandler");

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const personRoutes = require("./routes/personRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

connectToDb();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use("/API/users", userRoutes); // MongoDB
app.use("/API/movies", movieRoutes); // The Movie Database API
app.use("/API/persons", personRoutes); // The Movie Database API
app.use("/API/reviews", reviewRoutes); // MongoDB

app.use(errorHandler);

module.exports = app;