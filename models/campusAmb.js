/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;
const Validator = require("validator");

const campusAmbSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter Name"],
    maxlength: [40, "Name should Under 40 Chars"],
  },
  lastName: {
    type: String,
    required: [true, "Please Enter Name"],
    maxlength: [40, "Name should Under 40 Chars"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: [Validator.isEmail, "Please provide valid email"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide Phone Number"],
    validate: [Validator.isMobilePhone],
    unique: true,
  },
  city: {
    type: String,
    required: [true, "Please Enter your city"],
  },
  college: {
    type: String,
    maxlength: [20, "Please Use Shortform For College Name"],
  },
});

module.exports = mongoose.model("CampusAmb", campusAmbSchema);
