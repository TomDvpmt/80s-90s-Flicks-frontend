const express = require("express");
const router = express.Router();
const {getAllMovies, getOneMovie, updateMovie} = require("../controllers/movieCtrl");

router.get("/", getAllMovies);
router.get("/:id", getOneMovie);
router.put("/:id", updateMovie);

module.exports = router;