var SibApiV3Sdk = require("sib-api-v3-sdk");
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.SENDBLUE_API_KEY;
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();
const sendInBlue = async ({ firstName, to, subject, html }) => {
  try {
    const emailResponse = await emailApi.sendTransacEmail({
      subject,
      sender: { email: "contact@vishwapreneur.in", name: "Team Vishwapreneur" },
      replyTo: {
        email: "contact@vishwapreneur.in",
        name: "Team Vishwapreneur",
      },
      to: [{ name: firstName, email: to }],
      htmlContent: html,
      params: { bodyMessage: "Made just for you!" },
    });
    return emailResponse.data;
  } catch (error) {
    console.error(error.status);
    return error.status;
  }
};
module.exports = { sendInBlue };
