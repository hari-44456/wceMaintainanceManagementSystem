const nodemailer = require('nodemailer');
const path = require('path');

module.exports = (userEmail, message, provideAttachment = false) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: userEmail,
    subject: 'WCE Maintenance Management System',
    text: message,
  };

  if (provideAttachment)
    mailOptions.attachments = [
      {
        filename: 'wceMaintananceManagementSystem.pdf',
        path: path.join(__dirname, '..', 'pdf', 'result.pdf'),
        contentType: 'application/pdf',
      },
    ];

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      else resolve(info.response);
    });
  });
};
