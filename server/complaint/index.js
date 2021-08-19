const router = require('express').Router();

const { verify, verifyAdmin } = require('../verifyAuthToken');
const {
  validateCreateSchema,
  validateAcceptSchema,
  validateRejectSchema,
} = require('./validate');
const Complaint = require('./model');
const User = require('../login/model');
// const sendMail = require('../mail');
const Material = require('../material/model');
const Store = require('../store/model');
const { userRole, validUserRoles } = require('../utils/userRole');

const delteMaterialAndUpdateStore = (complaintId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Material.findOne(
        { complaintId },
        { availableInStore: 1 }
      );

      if (!data || !data.availableInStore) {
        resolve({ success: 1 });
        return;
      }
      const availableInStore = data.availableInStore;
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
    if (!validUserRoles(req.params.id))
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

    if (req.params.id !== userRole(role))
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
      case 'committee':
        query = {
          stage: { $gte: 3 },
          [`grantAccessTo.${department}.isGranted`]: true,
        };
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

    // await sendMail(email, 'Complaint Received successfully...');

    return res.status(200).json({
      success: 1,
      result,
    });
  } catch (error) {
    console.log(error);
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
      grantAccessTo,
    } = await Complaint.findOne({ _id: req.params.id }, { grantAccessTo: 1 })
      .populate('userId', 'email')
      .exec();

    if (req.user.userType === 'hod') {
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
    }

    if (req.user.userType === 'admin') {
      const grantAccessT = grantAccessTo.length
        ? grantAccessTo[0]
        : new Object();
      if (req.body.Civil) grantAccessT.Civil = { isGranted: true };
      if (req.body.Mechanical) grantAccessT.Mechanical = { isGranted: true };
      if (req.body.Electrical) grantAccessT.Electrical = { isGranted: true };

      await Complaint.updateOne(
        { _id: req.params.id },
        {
          $set: {
            stage: 3,
            status: 'Forwarded to Maintanance Commitee',
            grantAccessTo: [grantAccessT],
          },
        }
      );

      // await sendMail(email, status, true);
    }

    if (req.user.userType === 'committee') {
      //forward complaint to administraticve officer
      //change grantAccessto object's isSubmitted field etc.

      const { department } = await User.findOne({ _id: req.user._id });
      console.log(department);

      const complaint = await Complaint.findOne({
        _id: req.params.id,
        [`grantAccessTo.${department}.isGranted`]: true,
      });

      if (complaint) {
        complaint.grantAccessTo[0][department].isSubmitted = true;

        const obj = complaint.grantAccessTo[0];

        let flg = true;

        if (obj.Civil.isGranted && !obj.Civil.isSubmitted) flg = false;

        if (obj.Electrical.isGranted && !obj.Electrical.isSubmitted)
          flg = false;

        if (obj.Mechanical.isGranted && !obj.Mechanical.isSubmitted)
          flg = false;

        if (flg) {
          complaint.status = 'Forwarded to Administrative officer';
          complaint.stage++;
        }

        await complaint.save();
      }
    }

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

    // await sendMail(
    //   email,
    //   `${req.body.status} \n Reason: ${req.body.reasonForRejection}`
    // );

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
