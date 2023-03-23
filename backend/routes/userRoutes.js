const express = require("express");
const router = express.Router();
const {
    login,
    logout,
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userCtrl");
const { auth } = require("../middleware/auth");

router.post("/login", login);
router.post("/logout", logout);
router.get("/", auth, getAllUsers);
router.get("/:id", auth, getOneUser);
router.post("/", createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
