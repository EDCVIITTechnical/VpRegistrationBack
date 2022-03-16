/** @format */

const express = require("express");
const { RegisterForEvent, getAllParticipants, getAmbParticipants } = require("../controller/registerController");
const router = express.Router();

router.route("/registerEvent").post(RegisterForEvent);
router.route("/getAllParticipants").get(getAllParticipants);

module.exports = router;
