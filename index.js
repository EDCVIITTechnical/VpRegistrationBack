/** @format */

const app = require("./app");
const connectDb = require("./config/db");
require("dotenv").config();

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`App is Running on PORT ${process.env.PORT}`);
});
