const Joi = require('joi');

const schema = Joi.object()
  .keys({
    department: Joi.string().required('Department is required'),
    room: Joi.string().required('Location is Required'),
    nature: Joi.string().required('Type of Complaint is required'),
    signOfStudentOrStaff: Joi.string().required('Signature is required'),
    details: Joi.string().required('Details of Work is required'),
    title: Joi.string().required('Complaint Title is Required'),
  })
  .unknown(true);

module.exports = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(422).json({
      success: 0,
      error: error.details.map((d) => d.message).join(','),
    });
  }
};
