var nodemailer = require('nodemailer');

module.exports = (userEmail, message) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: userEmail,
    subject: 'WCE Maintenance Management System',
    text: message,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      else resolve(info.response);
    });
  });
};
