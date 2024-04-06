import * as nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.beget.com",
  port: 465,
  secure: true,
  auth: {
    user: "sender@matryoshka-studio.ru",
    pass: "mAGq8&L&",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
