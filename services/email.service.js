const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { PORT } = process.env;
const BASE_URL = `http://localhost:${PORT}/api`;

const sendEmail = async (userEmail, code) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  const link = `${BASE_URL}/users/verify/${code}`;
  const msg = {
    to: userEmail,
    from: "stepgamer2017@gmail.com",
    subject: "Confirm your Email",
    html: `<h2>Click on this link to confirm registrtation <a href=${link}>link</a></h2>`,
  };
  try {
    const result = await sgMail.send(msg);
    console.log("result", result);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

module.exports = {
  sendEmail,
};
