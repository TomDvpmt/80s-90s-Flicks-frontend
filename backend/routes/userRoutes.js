const express = require("express");
const router = express.Router();
const {login, getAllUsers, getOneUser, createUser, updateUser, deleteUser} = require("../controllers/userCtrl");

router.post("/login", login);
router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;