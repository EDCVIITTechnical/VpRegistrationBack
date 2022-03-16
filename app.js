/** @format */

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
var cors = require("cors");

// regular middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(morgan("tiny"));
app.use(cors());

// import all routes here
const home = require("./routes/home");
const user = require("./routes/user");
const register = require("./routes/register");
const payment = require("./routes/paymentRoutes");
const campusAmb = require("./routes/campusamb");
// router middlewares
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", register);
app.use("/api/v1/payment", payment);
app.use("/api/v1", campusAmb);
module.exports = app;
