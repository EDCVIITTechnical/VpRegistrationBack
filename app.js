/** @format */

const express = require("express");

const app = express();

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import All Routes here
const home = require("./routes/home");

// import All middlewares
app.use("/api/v1", home);

module.exports = app;
