const pdf = require('html-pdf');
const pdfTemplate = require('./pdfTemplate');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const pdfPath = path.join(__dirname, 'result.pdf');
const privateKeyPath = path.join(__dirname, '..', 'keys', 'privateKey.pem');
const signaturePath = path.join(__dirname, 'signature.txt');

module.exports.generatePdf = (data) => {
  return new Promise((resolve, reject) => {
    pdf.create(pdfTemplate(data), {}).toFile(pdfPath, (err) => {
      if (err) reject(new Error('Could not generate pdf'));

      const private_key = fs.readFileSync(privateKeyPath, 'utf-8');

      const doc = fs.readFileSync(pdfPath);

      const signer = crypto.createSign('RSA-SHA256');
      signer.write(doc);
      signer.end();

      const signature = signer.sign(private_key, 'base64');

      // console.log('Digital Signature: ', signature);

      // fs.writeFileSync(signaturePath, signature);

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
