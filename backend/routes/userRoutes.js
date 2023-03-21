const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.post("/", userCtrl.createUser);
router.put("/:id", userCtrl.updateUser);
router.get("/:id", userCtrl.deleteUser);

module.exports = router;