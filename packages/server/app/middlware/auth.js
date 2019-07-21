const User = require('../models/User');

module.exports = {

  isUserAuthenticated: async function(req, res, next) {
    if (!req.user) return res.json({success: false});

    try {
      const user = await User.findById(req.user._id);

      if (user) {
        req.user = user;
        return next();
      }

      return res.json({success: false});
    } catch (err) {
      console.error(err);

      return res.json({success: false});
    }
  }

}