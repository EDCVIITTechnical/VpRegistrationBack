const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
});

const createTestAccount = async() => {
    return await nodemailer.createTestAccount();
}

const getTestMessageUrl = (emailInfo) => {
 return nodemailer.getTestMessageUrl(emailInfo);
}

const sendEmailNM = async ({ to, subject, text, html}) => {
    return await transporter.sendMail({
        from: process.env.EMAIL_FROM, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
      });
}

module.exports = {
    createTestAccount,
    sendEmailNM,
    getTestMessageUrl
}