/** @format */

// bring the User model
const User = require("../models/user");
const BigPromise = require("../middlewares/BigPromise");
const cookieToken = require("../utils/cookieToken");
// const cloudinary = require("cloudinary");
const {
  createTestAccount,
  sendEmailNM,
  getTestMessageUrl,
} = require("./../utils/emailNodeMailer");
// const { sendEmailSG } = require("./../utils/emailSendGrid");S
const { sendInBlue } = require("./../utils/emailSendInBlue");
const fs = require("fs");
const path = require("path");
const { response } = require("express");

exports.signUp = BigPromise(async (req, res, next) => {
  // get the name email ans password from the body
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return next(new Error("Fields are missing!"));
  }
  // const emailInDB = await User.find({email : email});

  // if (emailInDB) {
  //   return next(new Error("Email is Already used!"));
  // }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, userpassword } = req.body;

  // check if user has entered all required fields
  if (!email || !userpassword) {
    return next(new Error("Fields are missing"));
  }

  // check if user exists in db
  const user = await User.findOne({ email }).select("+password");

  // if user doesnot exist in db
  if (!user) {
    return next(new Error("User doesnot exist head on to signUP"));
  }

  // if user exists
  const checkPassword = await user.isPasswordValid(userpassword);

  if (!checkPassword) {
    return next(new Error("Password inValid"));
  }

  // if password valid

  cookieToken(user, res);

  res.status(200).json({
    success: true,
    message: "You are logged in !",
  });
});

exports.logout = BigPromise(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully!",
  });
});

// admin routes
exports.getAllUsers = BigPromise(async (req, res) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

exports.createTestAccount = BigPromise(async (req, res) => {
  const testAccount = await createTestAccount();
  res.status(200).json({
    success: true,
    testAccount,
  });
});

exports.sendEmailNodeMailer = BigPromise(async (req, res) => {
  const { to } = req.body;
  const subject = "Hello From Viraj";
  const text = "Hello World";
  const html = "<b>Hello world?</b>";

  const emailDetails = await sendEmailNM({ to, subject, text, html });
  emailDetails.getTestMessageUrl = getTestMessageUrl(emailDetails);
  res.status(200).json({
    success: true,
    emailDetails,
  });
});

// exports.sendEmailSendGrid = BigPromise(async (req, res) => {
//   // const { to } = req.body;
//   const subject = "Hello From atharva";
//   const text = "Hello World";
//   const registrationTemplate = await fs.readFile(
//     path.join(process.cwd(), "/emailTemplate/registration.html"),
//     "utf-8"
//   );
//   let html = registrationTemplate.toString();

//   const emailDetails = await sendEmailSG();
//   console.log(emailDetails);
//   res.status(200).json({
//     success: true,
//     details: emailDetails,
//   });
// });
exports.sendEmailSendBlue = async (req, res) => {
  try {
    const { firstName, to, subject } = req.body;
    const registrationTemplate = await fs.readFileSync(
      path.join(process.cwd(), "../EmailTemplate/registration.html"),
      "utf-8"
    );
    const html = registrationTemplate.toString();
    let emailDetails = await sendInBlue({ firstName, to, subject, html });
    // console.log("abcd");
    emailDetails = { ...emailDetails, ...req.body };
    console.log(emailDetails); //email details coming undefined
    res.status(200).json({
      success: true,
      details: emailDetails,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      details: error.message || error.stack,
    });
  }
};
