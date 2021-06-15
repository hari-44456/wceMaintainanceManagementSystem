const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./model');
const validateSchema = require('./validate');
const { userRole } = require('../utils/userRole');

router.post('/', validateSchema, async (req, res) => {
  try {
    const user = await User.findOne(
      {
        username: req.body.username,
        password: req.body.password,
      },
      { role: 1, name: 1, email: 1, department: 1 }
    );

    if (!user)
      return res.status(400).json({
        success: 0,
        error: 'Username or Password is incorrect',
      });

    let userType = userRole(user.role);

    const token = jwt.sign(
      { _id: user._id, userType },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1hr',
      }
    );

    res.cookie('auth-token', token, { httpOnly: true });

    return res.status(200).json({
      success: 1,
      role: user.role,
      email: user.email,
      name: user.name,
      _id: user._id,
      department: user.department,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: 0,
      error: 'Unable To Login..Try Again after some time',
      errorReturned: error,
    });
  }
});

module.exports = router;
