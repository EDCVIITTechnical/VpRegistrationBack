/** @format */

const Register = require("../models/registrationForm");
const BigPromise = require("../middlewares/BigPromise");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");

exports.RegisterForEvent = BigPromise(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, city, college } = req.body;

  if (!firstName || !lastName || !email || !city || !phoneNumber) {
    return next(new Error("Fields are missing!"));
  }

  const register = await Register.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    city,
    college,
  });

  res.status(200).json({
    success: true,
    message: "You're successfully Registered for VP",
  });
});
