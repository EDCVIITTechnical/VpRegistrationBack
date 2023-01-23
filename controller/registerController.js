/** @format */

const Register = require("../models/registrationForm");
const BigPromise = require("../middlewares/BigPromise");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");
const { sendInBlue } = require("./../utils/emailSendInBlue");
const fs = require("fs");
const path = require("path");
const user = require("../models/user");
const axios = require("axios");

const sendRegistrationEmail = async (firstName, email) => {
  const subject = "Welcome to Vishwapreneur";
  // try {
  const registrationTemplate = await fs.readFileSync(
    path.join(process.cwd(), "/EmailTemplate/registration.html"),
    "utf-8"
  );
  const html = registrationTemplate.toString();
  let emailDetails = await sendInBlue({ firstName, email, subject, html });
  console.log(emailDetails);
  // emailDetails = { ...emailDetails, ...req.body };
  // console.log(emailDetails);
  // res.status(200).json({
  //   success: true,
  //   details: emailDetails,
  // });
  // } catch (error) {
  //   res.status(400).json({
  //     status: false,
  //     details: error.message || error.stack,
  //   });
  // }
};

// exports.sendRegistrsationEmail = BigPromise(async (email) => {
//   const subject = "Welcome to Vishwapreneur";
//   const text = "hello world";
//   const RegistationTemplate = await fs.readFile(
//     path.join(process.cwd(), "/EmailTemplate/registration.html"),
//     "utf-8"
//   );
//   let html = RegistationTemplate.toString();
//   const emailDetails = await sendEmailSG({ to: email, subject, text, html });
//   return emailDetails;
// });

exports.RegisterForEvent = BigPromise(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, city, college, code } =
    req.body;
  // try {
  if (!firstName || !lastName || !email || !city || !phoneNumber) {
    return next(new Error("Fields are missing!"));
  }

  const user = await Register.create(req.body);
  console.log("code reached before mail sending ");
  let responseMail = axios
    .post("https://registration-back-k5iw.onrender.com/api/v1/sendMail", {
      firstName: firstName,
      to: email,
      subject: "WelCome to VP",
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.data);
    });
  console.log("Code reached here after mail sending");
  res.status(200).json({
    success: true,
    message: "You're successfully Registered for VP",
    data: user,
    responseMail,
  });
  // } catch (error) {
  // res.status(400).json({
  //   success: false,
  //   message: error.message,
  // });
  // }
});

exports.getAllParticipants = BigPromise(async (req, res, next) => {
  const users = await Register.find({});

  res.status(200).json({
    users,
  });
});

exports.getParticipantsbyCity = BigPromise(async (req, res, next) => {
  const { city } = req.body;

  const users = await Register.find({ city: city });

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getParticipantsbyCollege = BigPromise(async (req, res, next) => {
  const { college } = req.body;

  const users = await Register.find({ college: college });

  res.status(200).json({
    success: true,
    users,
  });
});
