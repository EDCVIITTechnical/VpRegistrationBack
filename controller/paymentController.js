/** @format */

const BigPromise = require("../middlewares/BigPromise");
const Razorpay = require("razorpay");
const { createHmac } = require("crypto");

exports.createOrder = BigPromise(async (req, res, next) => {
  // create a new instance of razorpay
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_PUBKEY,
    key_secret: process.env.RAZORPAY_SECKEY,
  });
  const options = {
    amount: 15000,
    currency: "INR",
    receipt: "test_Receipt",
  };

  const order = await instance.orders.create(options);

  if (!order) {
    return res.status(500).send("Some error occured");
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.verifyPayment = BigPromise(async (req, res, next) => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;

  const shasum = createHmac("sha256", process.env.RAZORPAY_SECKEY);

  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
  const digest = shasum.digest("hex");

  // comparing digest with actual signature

  if (digest !== razorpaySignature) {
    return res.status(400).json({
      msg: "Transaction is not legit!",
    });
  }

  res.status(200).json({
    success: true,
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
  });
});
