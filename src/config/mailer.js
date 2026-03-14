const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

var transport = nodemailer.createTransport({
  service: "gmail",
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  //   tls: {
  //     rejectUnauthorized: false, // ✅ fix for dev
  //   },
});

module.exports = transport;
