/** @format */

const express = require("express");
const {
  seeAllCampusAmb,
  registerAsAmb,
  AmbParticipants,
} = require("../controller/campusAmbController");
const router = express.Router();

router.route("/displayAmb").get(seeAllCampusAmb);
router.route("/registerAsCampusAmb").post(registerAsAmb);
router.route("/ambParticipants").post(AmbParticipants);

module.exports = router;
