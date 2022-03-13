/** @format */

const express = require("express");
const {
  signUp,
  login,
  logout,
} = require("../controller/userController");
const { customRole, isLoggedIn } = require("../middlewares/userMiddlewares");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(logout);


module.exports = router;