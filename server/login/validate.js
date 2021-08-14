const Joi = require('joi');

const schema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      success: 0,
      error: error.details.map((doc) => doc.message).join(','),
    });
  }
};
