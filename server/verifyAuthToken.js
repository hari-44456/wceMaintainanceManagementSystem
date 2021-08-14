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
      if (new Date(Date.now() - decoded.exp).getMinutes() <= 10) {
        const refreshedToken = jwt.sign(
          { _id: decoded._id, userType: decoded.userType },
          process.env.TOKEN_SECRET,
          {
            expiresIn: '1hr',
          }
        );
        res.cookie('auth-token', refreshedToken, { httpOnly: true });
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
        if (new Date(Date.now() - decoded.exp).getMinutes() <= 10) {
          const refreshedToken = jwt.sign(
            { _id: decoded._id, userType: decoded.userType },
            process.env.TOKEN_SECRET,
            {
              expiresIn: '1hr',
            }
          );
          res.cookie('auth-token', refreshedToken, { httpOnly: true });
        }
        req.user = decoded;

        const user = await User.findOne({
          _id: decoded._id,
          role: { $gte: 2 },
        });

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
