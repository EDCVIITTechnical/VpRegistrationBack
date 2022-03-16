/** @format */

const BigPromise = require("../middlewares/BigPromise");
const CampusAmb = require("../models/campusAmb");
const Register = require("../models/registrationForm");

exports.registerAsAmb = BigPromise(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, city, college } = req.body;

  if (!firstName || !lastName || !email || !city || !phoneNumber) {
    return next(new Error("Fields are missing!"));
  }

  const checkEmail = await Register.findOne({ email: email });

  if (!checkEmail) {
    return next(
      new Error("You must register for the event before becoming campus amb")
    );
  }

  const register = await CampusAmb.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    city,
    college,
  });

  res.status(200).json({
    success: true,
    message: "You're successfully Registered As Campus Amb",
  });
});

exports.seeAllCampusAmb = BigPromise(async (req, res, next) => {
  const ambs = await CampusAmb.find({});

  res.status(200).json({
    ambs,
  });
});

exports.AmbParticipants = BigPromise(async (req, res, next) => {
  const { email } = req.body;
  const users = await Register.find({ code: email });

  res.status(200).json({
    users,
  });
});
