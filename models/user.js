/** @format */

const bcrypt = require("bcryptjs");
const argon2 = require('argon2');
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema({
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
    unique:true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Please provide a password of atleast 8 Char"],
  },
  role: {
    type: String,
    default: "user",
  },
  photo: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// methods for the user models

// we don't want to encrypt password everytime any data is changed in the db but for once and if the password is changed
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  // this.password = await argon2.hash(this.password);
});

// validate the password with passed on user password
userSchema.methods.isPasswordValid = async function (usersendPassword) {
  return await bcrypt.compare(usersendPassword, this.password);

  // return argon2.verify(this.password,usersendPassword)
};

// create a JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// method to generate the forgot password string
userSchema.methods.getForgotPasswordString = function () {
  const forgotToken = crypto.randomBytes(20).toString("hex");
  // the field in the model is updated by this
  // get the hash on backend as well
  // whenever user sends back the hash compare the hash in db and the user sent hash along with the expiry for the string
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  // time for the token
  this.forgotPasswordExpiry = Date.now + 20 * 60 * 1000;

  return forgotToken;
};

module.exports = mongoose.model("User", userSchema);
