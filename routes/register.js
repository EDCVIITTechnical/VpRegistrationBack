/** @format */

const express = require("express");
const { RegisterForEvent, getAllUsers } = require("../controller/registerController");
const router = express.Router();

router.route("/registerEvent").post(RegisterForEvent);
router.route("/getAllUsers").get(getAllUsers);

module.exports = router;
