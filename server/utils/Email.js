const nodemailer = require("nodemailer");

const sendEmail = async () => {
  // 1 create a transporter

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "yoni2528@gmail.com",
      pass: "tbodbkratdbleqah",
    },
  });
  //2 define the email optiosn
  const mailOptions = {
    from: "Yonatna Atias",
    to: "atiasyehonatan@gmail.com",
    subject: "How Are You?",
    text: "<h1>Are YOU Ok There</h1>",
  };
  //3 send the email
  await transporter.sendMail(mailOptions);
};

sendEmail();

module.exports = sendEmail;
