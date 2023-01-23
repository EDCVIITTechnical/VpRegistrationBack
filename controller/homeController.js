/** @format */

const BigPromise = require("../middlewares/BigPromise");

exports.home = BigPromise(async (req, res, next) => {
    res.status(200).json({
      success: true,
      greeting: "Hello from Backend...!",
    });
  });
  