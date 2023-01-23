/** @format */

const express = require("express");
const { signUp, login, logout, getAllUsers } = require("../controller/userController");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getAllUsers").get(getAllUsers);

module.exports = router;
