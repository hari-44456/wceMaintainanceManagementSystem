const Joi = require('joi');

const schema = Joi.object()
  .keys({
    material: Joi.string().required('Material Name is required'),
    cost: Joi.number().required('Cost is required'),
    quantity: Joi.number().required('Quantity is required'),
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
