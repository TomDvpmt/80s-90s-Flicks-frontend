const express = require("express");
const router = express.Router();
const personCtrl = require("../controllers/personCtrl");

router.get("/", personCtrl.getOnePerson);

module.exports = router;