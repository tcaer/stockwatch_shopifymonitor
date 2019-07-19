const User = require('../models/User');

module.exports = {

  isUserAuthenticated: async function(req, res, next) {
    if (!req.user) return res.sendStatus(401);

    try {
      const user = await User.findById(req.user._id);

      if (user) {
        req.user = user;
        return next();
      }

      res.sendStatus(401);
    } catch (err) {
      console.error(err);

      res.sendStatus(401);
    }
  }

}