const Joi = require('joi');

const schema = Joi.object()
  .keys({
    type: Joi.string().required().valid('available', 'ordered'),
    complaintId: Joi.string().required('Complaint id is required'),
    sign: Joi.string().required('Signature is required'),
  })
  .when(Joi.object({ type: Joi.string().valid('ordered') }).unknown(true), {
    then: Joi.object({
      material: Joi.string().required('Material name is required'),
      approxCost: Joi.number().required('Approximate cost is required'),
      quantity: Joi.number().required('Quantity is required'),
    }),
  })
  .when(Joi.object({ type: Joi.string().valid('available') }).unknown(true), {
    then: Joi.object({
      materialId: Joi.string().required('Material id not provided'),
      quantity: Joi.number().required('Quantity not provided'),
    }),
  });

const updateSchema = Joi.object()
  .keys({
    type: Joi.string().required().valid('available', 'ordered'),
    quantity: Joi.number().required(),
    complaintId: Joi.string().required('Complaint id is required'),
  })
  .when(Joi.object({ type: Joi.string().valid('available') }).unknown(true), {
    then: Joi.object({
      unitsBeforeEditing: Joi.number().required(),
    }),
  })
  .when(
    Joi.object({ type: Joi.string().required().valid('ordered') }).unknown(
      true
    ),
    {
      then: Joi.object({
        material: Joi.string().required(),
        approxCost: Joi.number().required(),
      }),
    }
  )
  .unknown(true);

const deleteSchema = Joi.object().keys({
  complaintId: Joi.string().required(),
  type: Joi.string().required().valid('available', 'ordered'),
  quantity: Joi.number().required(),
});

module.exports.validatePost = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(422).json({
      success: 0,
      error: error.details.map((doc) => doc.message).join(','),
    });
  }
};

module.exports.validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(422).json({
      success: 0,
      error: error.details.map((d) => d.message).join(','),
    });
  }
};

module.exports.validateDelete = async (req, res, next) => {
  try {
    await deleteSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(422).json({
      success: 0,
      error: error.details.map((d) => d.message).join(','),
    });
  }
};
