/** @format */

const express = require("express");
const {
  RegisterForEvent,
  getAllParticipants,
  getParticipantsbyCity,
  getParticipantsbyCollege,
  sendRegistrsationEmail,
} = require("../controller/registerController");
const { sendEmailSendBlue } = require("../controller/userController");
const router = express.Router();

router.route("/registerEvent").post(RegisterForEvent);
// admin
router.route("/getAllParticipants").get(getAllParticipants);
router.route("/getParticipantsbyCity").post(getParticipantsbyCity);
router.route("/getParticipantsbyCollege").post(getParticipantsbyCollege);
router.route("/sendMail").post(sendEmailSendBlue);
module.exports = router;
