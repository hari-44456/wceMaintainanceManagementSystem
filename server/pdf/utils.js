const pdf = require('html-pdf');
const pdfTemplate = require('./pdfTemplate');
const path = require('path');
const fs = require('fs');

const pdfPath = path.join(__dirname, 'result.pdf');

module.exports.generatePdf = (data) => {
  return new Promise((resolve, reject) => {
    pdf.create(pdfTemplate(data), {}).toFile(pdfPath, (err) => {
      if (err) reject(new Error('Could not generate pdf'));
      resolve({ success: true, message: 'pdf generated successfully..' });
    });
  });
};

module.exports.removePdf = () => {
  return new Promise((resolve, reject) => {
    fs.unlink(pdfPath, (err, data) => {
      if (err) reject(new Error('Unable to remove file'));
      resolve({ success: true, message: 'File removed successfully...' });
    });
  });
};
