/** @format */

// bring the User model
const User = require("../models/user");
const BigPromise = require("../middlewares/BigPromise");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");

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

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully!",
  });
});

exports.getAllUsers = BigPromise(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});
