/** @format */

const express = require("express");
const { RegisterForEvent, getAllParticipants, getParticipantsbyCity,getParticipantsbyCollege } = require("../controller/registerController");
const router = express.Router();

router.route("/registerEvent").post(RegisterForEvent);
// admin
router.route("/getAllParticipants").get(getAllParticipants);
router.route("/getParticipantsbyCity").post(getParticipantsbyCity)
router.route("/getParticipantsbyCollege").post(getParticipantsbyCollege)

module.exports = router;
