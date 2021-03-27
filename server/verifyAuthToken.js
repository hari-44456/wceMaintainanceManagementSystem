const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    let token = req.cookies['auth-token'];

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          error: 'Invalid token',
        });
      }
      req.user = decoded.data;
      next();
    });
  } catch (error) {
    res.status(403).json({
      success: 0,
      error: 'Unauthorized',
      errorReturned: error,
    });
  }
};
