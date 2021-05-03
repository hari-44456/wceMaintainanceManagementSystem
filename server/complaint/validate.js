const Joi = require('joi');

const complaintSchema = Joi.object()
  .keys({
    department: Joi.string().required('Department is required'),
    room: Joi.string().required('Location is Required'),
    workType: Joi.string()
      .required('Type of Complaint is required')
      .valid('Electrical', 'Plumbing', 'Repair', 'Furniture', 'Other'),
    signOfStudentOrStaff: Joi.string().required('Signature is required'),
    details: Joi.string().required('Details of Work is required'),
  })
  .when(
    Joi.object({ workType: Joi.string().required().valid('Other') }).unknown(
      true
    ),
    {
      then: Joi.object({
        otherWork: Joi.string().required('Work Type Not Provided'),
      }),
    }
  )
  .unknown(true);

const accpetSchema = Joi.object()
  .keys({
    sourceOfFund: Joi.string()
      .required('Source of fund is not provided')
      .valid('Diploma', 'UG', 'PG', 'Lab', 'Other'),
  })
  .when(
    Joi.object({
      sourceOfFund: Joi.string().required().valid('Other'),
    }).unknown(true),
    {
      then: Joi.object({
        otherSourceOfFund: Joi.string().required(),
      }),
    }
  )
  .unknown(true);

const rejectSchema = Joi.object()
  .keys({
    reasonForRejection: Joi.string().required(),
    userType: Joi.string()
      .required()
      .valid('hod', 'admin', 'maintanance commitee'),
  })
  .unknown(true);

module.exports.validateCreateSchema = async (req, res, next) => {
  try {
    await complaintSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(422).json({
      success: 0,
      error: error.details.map((d) => d.message).join(','),
    });
  }
};

module.exports.validateAcceptSchema = async (req, res, next) => {
  try {
    await accpetSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(422).json({
      success: 0,
      error: error.details.map((d) => d.message).join(','),
    });
  }
};

module.exports.validateRejectSchema = async (req, res, next) => {
  try {
    await rejectSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(422).json({
      success: 0,
      error: error.details.map((d) => d.message).join(','),
    });
  }
};
