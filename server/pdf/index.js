const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const { verify } = require('../verifyAuthToken');
const { generatePdf, removePdf } = require('./utils');
const Complaint = require('../complaint/model');
const User = require('../login/model');

router.get('/:id', verify, async (req, res) => {
  try {
    const { email } = await User.findOne(
      { _id: req.user._id },
      { email: 1, _id: 0 }
    );

    const data = await Complaint.findOne({ _id: req.params.id });

    generatePdf({
      email,
      room: data.room,
      details: data.details,
      sourceOfFund: data.sourceOfFund,
      workType: data.workType,
      status: data.status,
    });

    var file = path.join(__dirname, 'result.pdf');

    fs.readFile(file, function (err, data) {
      res.contentType('application/pdf');
      res.send(data);
    });
    removePdf();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: 0,
      error: 'Unable to complate operation',
    });
  }
});

module.exports = router;
