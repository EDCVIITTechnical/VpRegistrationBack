/** @format */

const app = require("./app");
const connectDb = require("./config/db");
require("dotenv").config();

// connect with Database
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`App is Running on PORT ${process.env.PORT}`);
});
