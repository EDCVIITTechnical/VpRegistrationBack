/** @format */

const Register = require("../models/registrationForm");
const BigPromise = require("../middlewares/BigPromise");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");
const {sendEmailSG}=require('./../utils/emailSendGrid');
const fs=require('fs').promises;
const path=require('path');
const user = require("../models/user");

exports.sendRegistrsationEmail=BigPromise(async(email)=>{
  const subject="Welcome to Vishwapreneur";
  const text="hello world";
  const RegistationTemplate= await fs.readFile(
    path.join(process.cwd(),"/EmailTemplate/registration.html"),"utf-8"
  );
  let html=RegistationTemplate.toString();
  const emailDetails=await sendEmailSG({to:email,subject,text,html});
  return emailDetails;
});

exports.RegisterForEvent = BigPromise(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, city, college, code } =
    req.body;
  try{
    if (!firstName || !lastName || !email || !city || !phoneNumber) {
      return next(new Error("Fields are missing!"));
    }
  
    const user = await Register.create(req.body);
    await this.sendRegistrsationEmail(email);
    res.status(200).json({
      success: true,
      message: "You're successfully Registered for VP",
      data:user,
    });
  }
  catch(error){
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  
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
