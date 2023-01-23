/** @format */

const express = require("express");
const { home } = require("../controller/homeController");
const router = express.Router();

router.route("/home").get(home);

module.exports = router;
