const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailSG = async ({ to, subject, text, html}) => {
    try {
        const msg = {
            to,
            from: process.env.EMAIL_FROM, // Use the email address or domain you verified above
            subject ,
            text,
            html,
        };
        return await sgMail.send(msg)
    } catch (error) {
        console.error(error);
    }     
}

module.exports = {
    sendEmailSG
}