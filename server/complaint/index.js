const router = require('express').Router();

const { verify } = require('../verifyAuthToken');
const {
  validateCreateSchema,
  validateAcceptSchema,
  validateRejectSchema,
} = require('./validate');
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

router.post('/', verify, validateCreateSchema, async (req, res) => {
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

router.get('/details/:id', verify, async (req, res) => {
  console.log('CAlled ROute');
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: 0,
        error: 'Complaint id not provided',
      });

    const complaint = await Complaint.findOne({ _id: req.params.id })
      .populate('userId', 'email')
      .exec();

    if (!complaint)
      return res.status(400).json({
        success: 0,
        error: 'Could not find requested complaint',
      });

    return res.status(200).json({
      success: 1,
      complaint,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: 0,
      error: 'Unable to find details',
    });
  }
});

router.post('/accept/:id', verify, validateAcceptSchema, async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: 0,
        error: 'Complaint id not provided',
      });

    const {
      userId: { email },
    } = await Complaint.findOne({ _id: req.params.id })
      .populate('userId', 'email')
      .exec();

    await Complaint.updateOne(
      { _id: req.params.id },
      {
        $set: {
          stage: 2,
          sourceOfFund:
            req.body.sourceOfFund === 'Other'
              ? req.body.otherSourceOfFund
              : req.body.sourceOfFund,

          status: 'Forwarded to Administrative Officer',
        },
      }
    );

    await sendMail(email, 'Forwarded to Administrative OFficer');
    return res.status(200).json({
      success: 1,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: 0,
      error: 'Could not complate operation',
    });
  }
});

router.post('/reject/:id', verify, validateRejectSchema, async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: 0,
        error: 'Complaint id not provided',
      });

    const {
      userId: { email },
    } = await Complaint.findOne({ _id: req.params.id })
      .populate('userId', 'email')
      .exec();

    req.body.rejected = true;
    req.body.status = 'Rejected by Hod';

    await Complaint.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    await sendMail(email, req.body.reasonForRejection);

    return res.status(200).json({
      success: 1,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: 0,
      error: 'Could not complate operation',
    });
  }
});

module.exports = router;
