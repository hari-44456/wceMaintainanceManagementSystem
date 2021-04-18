const router = require('express').Router();

const { verify } = require('../verifyAuthToken');
const verifySchema = require('./validate');
const Complaint = require('./model');
const User = require('../login/model');
const sendMail = require('../mail');

const isValid = (id) => {
  switch (id) {
    case 'student':
    case 'hod':
    case 'ao':
    case 'commitee':
      return true;
    default:
      return false;
  }
};

router.get('/:id', verify, async (req, res) => {
  try {
    if (!isValid(req.params.id))
      return res.status(400).json({
        success: 0,
        error: 'Invalid Request',
      });

    const { department } = await User.findOne({ _id: req.user }).select({
      _id: 0,
      department: 1,
    });

    let query;
    switch (req.params.id) {
      case 'student':
        query = { userId: req.user };
        break;
      case 'hod':
        query = { department };
        break;
      case 'ao':
        query = { stage: { $gte: 2 } };
        break;
      case 'commitee':
        query = { stage: { $gte: 3 } };
        break;
    }

    const result = await Complaint.find(query).select({
      department: 1,
      date: 1,
      workType: 1,
      status: 1,
    });
    return res.status(200).json({
      success: 1,
      complaints: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: 0,
      error: 'Unable to fetch data',
      errorReturned: error,
    });
  }
});

router.post('/', verify, verifySchema, async (req, res) => {
  try {
    req.body.userId = req.user;
    const { email } = await User.findOne({ _id: req.user }).select({
      email: 1,
    });

    const newComplaint = new Complaint(req.body);
    const result = await newComplaint.save();

    await sendMail(email, 'Complaint Received successfully...');

    return res.status(200).json({
      success: 1,
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: 0,
      error: 'Unable to Create Complaint',
    });
  }
});

module.exports = router;
