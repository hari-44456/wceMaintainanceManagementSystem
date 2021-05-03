const jwt = require('jsonwebtoken');
const User = require('./login/model');

module.exports.verify = async (req, res, next) => {
  try {
    let token = req.cookies['auth-token'];
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: 0,
          error: 'Invalid token',
        });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(403).json({
      error: 'Unauthorized',
      errorReturned: error,
    });
  }
};

module.exports.verifyAdmin = async (req, res, next) => {
  try {
    let token = req.cookies['auth-token'];
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      try {
        if (err) {
          return res.status(403).json({
            success: 0,
            error: 'Invalid token',
          });
        }
        req.user = decoded;

        const user = await User.findOne({ _id: decoded._id, role: 2 });

        if (!user) throw new Error('Unauthorized ');
        next();
      } catch (error) {
        return res.status(403).json({
          success: 0,
          error: 'Unauthorized',
          errorReturned: error,
        });
      }
    });
  } catch (error) {
    return res.status(403).json({
      success: 0,
      error: 'Unauthorized',
      errorReturned: error,
    });
  }
};
