const router = require('express').Router();

const { verify, verifyAdmin } = require('../verifyAuthToken');
const {
  validateCreateSchema,
  validateAcceptSchema,
  validateRejectSchema,
} = require('./validate');
const Complaint = require('./model');
const User = require('../login/model');
const sendMail = require('../mail');
const Material = require('../material/model');
const Store = require('../store/model');
const { generatePdf, removePdf } = require('../pdf');

const isValid = (id) => {
  switch (id) {
    case 'student':
    case 'hod':
    case 'admin':
    case 'commitee':
      return true;
    default:
      return false;
  }
};

const getRole = (id) => {
  switch (id) {
    case 0:
      return 'student';
    case 1:
      return 'hod';
    case 2:
      return 'admin';
    case 3:
      return 'maintananceCommitee';
  }
};

const delteMaterialAndUpdateStore = (complaintId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { availableInStore } = await Material.findOne(
        { complaintId },
        { availableInStore: 1 }
      );

      availableInStore.forEach(
        async (material) =>
          await Store.updateOne(
            { _id: material.materialId },
            { $inc: { quantity: material.quantity } }
          )
      );

      await Material.deleteOne({ complaintId });

      resolve(availableInStore);
    } catch (error) {
      reject(error);
    }
  });
};

router.get('/:id', verify, async (req, res) => {
  try {
    if (!isValid(req.params.id))
      return res.status(400).json({
        success: 0,
        error: 'Invalid Request',
      });

    const { department, role } = await User.findOne({
      _id: req.user._id,
    }).select({
      _id: 0,
      department: 1,
      role: 1,
    });

    if (req.params.id !== getRole(role))
      return res.status(403).json({
        success: 0,
        error: 'Unauthorized',
      });

    let query;
    switch (req.params.id) {
      case 'student':
        query = { userId: req.user._id };
        break;
      case 'hod':
        query = { department };
        break;
      case 'admin':
        query = { stage: { $gte: 2 } };
        break;
      case 'commitee':
        query = { stage: { $gte: 3 } };
        break;
    }

    const result = await Complaint.find(query)
      .select({
        department: 1,
        date: 1,
        workType: 1,
        status: 1,
      })
      .sort({ date: -1 });

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

router.get('/getMaterial/:id', verifyAdmin, async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: 0,
        error: 'Complaint id not provided',
      });

    const existingMaterials = await Material.findOne(
      { complaintId: req.params.id },
      { availableInStore: 1, orderedMaterial: 1 }
    ).populate({
      path: 'availableInStore.materialId',
      model: 'Store',
      select: { material: 1, cost: 1 },
    });

    return res.status(200).json({
      success: 1,
      availableInStore: existingMaterials
        ? existingMaterials.availableInStore
        : [],
      orderedMaterial: existingMaterials
        ? existingMaterials.orderedMaterial
        : [],
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: 0,
      error: 'Could not find data',
    });
  }
});

router.post('/', verify, validateCreateSchema, async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const { email } = await User.findOne({ _id: req.user._id }).select({
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

    const status =
      req.user.userType === 'hod'
        ? 'Forwarded to Administrative Officer'
        : 'Forwarded to Maintanance Commitee';

    await Complaint.updateOne(
      { _id: req.params.id },
      {
        $set: {
          stage: 2,
          sourceOfFund:
            req.body.sourceOfFund === 'Other'
              ? req.body.otherSourceOfFund
              : req.body.sourceOfFund,
          status,
        },
      }
    );

    if (req.user.userType === 'admin') {
      await generatePdf();
      await sendMail(email, status, true);
      // await removePdf();
    } else await sendMail(email, status, false);

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

    req.body.status = `Rejected by ${req.user.userType}`;

    await Complaint.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );

    await sendMail(
      email,
      `${req.body.status} \n Reason: ${req.body.reasonForRejection}`
    );

    if (req.user.userType === 'admin')
      await delteMaterialAndUpdateStore(req.params.id);

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
