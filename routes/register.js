/** @format */

const express = require("express");
const { RegisterForEvent } = require("../controller/registerController");
const router = express.Router();

router.route("/registerEvent").post(RegisterForEvent);

module.exports = router;
