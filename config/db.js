/** @format */

const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Db is Connected"))
    .catch((err) => {
      console.log("====================================");
      console.log(err);
      console.log("Problem in connecting with DB");
      console.log("====================================");
    });
};

module.exports = connectDb;