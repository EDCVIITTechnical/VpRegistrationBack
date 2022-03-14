/** @format */

const express = require("express");
const {
  createOrder,
  verifyPayment,
} = require("../controller/paymentController");
const router = express.Router();

router.route("/orders").get(createOrder);
router.route("/success").post(verifyPayment);

module.exports = router;
