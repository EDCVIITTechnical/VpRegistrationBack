const sgMail = require("@sendgrid/mail");
const { getMaxListeners } = require("../models/user");

const sendEmailSG = async () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "vpadale86@gmail.com",
    from: "contact@vishwapreneur.in", // Use the email address or domain you verified above
    subject: "hi",
    text: "hi",
  };
  let res = await sgMail
    .send(msg)
    .then((response) => {
      console.log(`this is res data ${response.data}`);
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(`This is res ${res}`);
  return res;
};

module.exports = { sendEmailSG };
