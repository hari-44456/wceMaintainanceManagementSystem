const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./model');
const validateSchema = require('./validate');

router.post('/', validateSchema, async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user)
      return res.status(400).json({
        success: 0,
        error: 'Username or Password is incorrect',
      });

    const token = jwt.sign({ data: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: '1hr',
    });
    res.cookie('auth-token', token, { httpOnly: true });

    return res.status(200).json({
      success: 1,
      role: user.role,
    });
  } catch (error) {
    return res.status(400).json({
      success: 0,
      error: 'Unable To Login..Try Again after some time',
      errorReturned: error,
    });
  }
});

module.exports = router;
