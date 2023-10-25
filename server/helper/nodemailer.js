const nodemailer = require("nodemailer");

const sendEmail = (dataEmail) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "samuel96silalahi@gmail.com",
      pass: "qbfv ypvw emtm ciil",
    },
  });

  return transporter
    .sendMail(dataEmail)
    .then((info) => console.log(`Email Terkirim ${info.message}`))
    .catch((error) => console.log(`Terjadi Kesalahan ${error}`));
};

module.exports = { sendEmail };
